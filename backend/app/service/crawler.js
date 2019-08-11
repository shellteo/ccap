'use strict';

const Service = require('egg').Service;
const superagent = require('superagent');
const cheerio = require('cheerio');
const moment = require('moment');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const path = require('path');

class CrawlerService extends Service {
  async list(url, belong) {
    const { ctx } = this;
    let html = '';
    // https://coincodex.com/ico-calendar/
    // https://coincodex.com/ieo-list/
    // https://coincodex.com/sto-list/
    try {
      html = await nightmare
        .goto(url)
        .wait(() => {
          let loadMoreText = document.querySelector('.load-more span.button');
          if (loadMoreText == null) return true;
          document.querySelector('.load-more span.button').click();
          return false;
        })
        .evaluate(() => {
          console.log(document.querySelector("div.main-content").innerHTML);
          return document.querySelector("div.main-content").innerHTML
        })
    } catch (e) {
      console.error(e);
    }
    const coinList = await this.loadList(html, belong)
    return coinList
  }
  async detail(url) {
    const { ctx } = this;
    const res = await superagent.get(`https://coincodex.com${url}`); // /ieo/top-network/
    const result = this.getCoinObj(res);
    // 上传图片到oss
    // await ctx.service.oss.uploadFile(result.logo);
    return result;
  }
  async loadList(html,belong) {
    const { ctx } = this;
    let $ = cheerio.load(html);
    let list = [];
    $('tbody tr.ico-calendar-entry').each(async (idx, ele) => {
      let logoUrl = $(ele).find('td.entry-name a .ico-logo-wrapper img').attr('src').trim().replace(':resizeboxcrop?32x32', '');
      /*// 图片上传到oss
      try {
        await ctx.service.oss.uploadFile(logoUrl);
      } catch (e) {
        console.log(logoUrl);
      }*/
      let logoName = path.basename(logoUrl)
      list.push({
        detail_link: $(ele).find('td.entry-name a').attr('href'),
        logo: `/coins/${logoName}`,
        symbol: $(ele).find('span.ico-symbol').first().text().trim(),
        coin_name: $(ele).find('span.ico-name').first().text().trim(),
        belong  // 属于什么，0:IEOs,1:STOs,2:ICOs
      })
    });
    console.log(list);
    return list;
  }
  getCoinObj(res) {
    const { ctx } = this;
    const _2key = ctx.helper._2key
    const _2value = ctx.helper._2value
    let $ = cheerio.load(res.text);
    let distribution = {}
    $('div.token-distribution ul li').each((idx, ele) => {
      let name = _2key($(ele).find('.distribution-name').text())
      let val = $(ele).find('.value').text().trim()
      distribution[name] = val
    })
    let stages = []
    $('.section-ico-overview .ico-stages-entry').each((idx, ele) => {
      let funding = {}
      $(ele).children('.entry-content').find('ul li').each((idx2, ele2) => {
        let name = $(ele2).text();
        let val = $(ele2).find('span').text();
        let key = _2key(name.replace(val, ''));
        funding[key] = _2value(val)
      })
      let dates = $(ele).find('.ico-stage-dates').text().split('—')
      const fromFormat = 'MMM DD, YYYY'
      const toFormat = 'YYYY-MM-DD'
      let start = null
      let end = null
      if (dates.length === 2) {
        let startDate = dates[0].trim()
        let endDate = dates[1].trim()
        start = moment(startDate, fromFormat).format(toFormat)
        end = moment(endDate, fromFormat).format(toFormat)
      }
      stages.push({
        stage: $(ele).find('.ico-stage-name').text().trim(),
        start,
        end,
        bonuses: _2value($(ele).find('.col-7 span').text()),
        ...funding
      })
    })
    let funding = {}
    $('.ico-data table tr.ico-data-entry').each((idx, ele) => {
      let key = _2key($(ele).find('th').text());
      funding[key] = _2value($(ele).find('td').text());
    })
    let news = []
    $('.news-feed .news-feed-entry').each((idx, ele) => {
      if ($(ele).find('span.tag').text() === 'Sponsored') return true;
      const link = $(ele).find('.entry-data a.entry-title').attr('href')
      const h = $(ele).find('.entry-meta span').first().text().split(' ')
      const publishTime = moment().subtract(parseInt(h[0]), h[1]).unix()
      news.push({
        from: $(ele).find('img.logo').attr('alt'), // 来自哪
        media: $(ele).find('.entry-meta span').last().text(), // 账号
        publishTime,
        title: $(ele).find('.entry-data a.entry-title span').text(),
        link: ctx.helper.removeURLParameter(link, 'utm_source')
      })
    })
    return {
      // logo: $('.main-title img').attr('src').trim().replace(':resizebox?70x70', ''),
      rating: _2value($('.col .ico-rating .rating-value').html()),
      current_bonus: _2value($('.current-bonus').find('span').text()),
      bounties: _2value($('.bounties').find('.ico-bounties').text()),
      funding,
      distribution: JSON.stringify(distribution),
      stages,
      news
    }
  }
}

module.exports = CrawlerService;
