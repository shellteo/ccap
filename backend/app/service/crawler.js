'use strict';

const Service = require('egg').Service;
const superagent = require('superagent');
const cheerio = require('cheerio');
const moment = require('moment');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

class CrawlerService extends Service {
  async list(url) {
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
    const coinList = this.loadList(html)
    return coinList
  }
  async detail(url) {
    const { ctx } = this;
    const res = await superagent.get(`https://coincodex.com${url}`); // /ieo/top-network/
    const result = this.getCoinObj(res);
    // 上传图片到oss
    await ctx.service.oss.uploadFile(result.logo);
    return result;
  }
  loadList(html) {
    const { ctx } = this;
    let $ = cheerio.load(html);
    let list = [];
    $('tbody tr.ico-calendar-entry').each((idx, ele) => {
      list.push({
        detail_link: $(ele).find('td.entry-name a').attr('href'),
        logo: $(ele).find('td.entry-name a .ico-logo-wrapper img').attr('src'),
        symbol: $(ele).find('span.ico-symbol').first().text(),
        coin_name: $(ele).find('span.ico-name').first().text(),
        belong: 0  // 属于什么，0:IEOs,1:STOs,2:ICOs
      })
    });
    console.log(list);
    return list;
  }
  getCoinObj(res) {
    const { ctx } = this;
    let $ = cheerio.load(res.text);
    let Distribution = {}
    $('div.token-distribution ul li').each((idx, ele) => {
      let name = $(ele).find('.distribution-name').text()
      let val = $(ele).find('.value').text()
      Distribution[name] = val
    })
    let stages = []
    $('.section-ico-overview .ico-stages-entry').each((idx, ele) => {
      let funding = {}
      $(ele).children('.entry-content').find('ul li').each((idx2, ele2) => {
        let name = $(ele2).text();
        let val = $(ele2).find('span').text();
        funding[name.replace(val, '').trim()] = val
      })
      let dates = $(ele).find('.ico-stage-dates').text().split('—')
      let startDate = dates[0].trim()
      let endDate = dates[1].trim()
      const fromFormat = 'MMM DD, YYYY'
      const toFormat = 'YYYY-MM-DD'
      stages.push({
        stage: $(ele).find('.ico-stage-name').text().trim(),
        start: moment(startDate, fromFormat).format(toFormat),
        end: moment(endDate, fromFormat).format(toFormat),
        bonuses: $(ele).find('.col-7 span').text().trim(),
        funding
      })
    })
    let funding = {}
    $('.ico-data table tr.ico-data-entry').each((idx, ele) => {
      funding[$(ele).find('th').text()] = $(ele).find('td').text()
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
      logo: $('.main-title img').attr('src').trim().replace(':resizebox?70x70', ''),
      rating: $('.col .ico-rating .rating-value').html().trim(),
      current_bonus: $('.current-bonus').find('span').text().trim(),
      bounties: $('.bounties').find('.ico-bounties').text().trim(),
      funding,
      Distribution,
      stages,
      news
    }
  }
}

module.exports = CrawlerService;
