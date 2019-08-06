'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
const superagent = require('superagent');
const cheerio = require('cheerio');
const moment = require('moment');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })


class ManagementController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (username === this.config.login.username && password === this.config.login.password) {
      const msg = ctx.msg.success;
      msg.data = this.jwtSign({username, password});
      ctx.body = msg;
    } else {
      ctx.body = ctx.msg.loginFailed;
    }
  }
  // jwt签名
  jwtSign(user) {
    // 过期时间
    const expires = this.config.managementLogin.expires;
    // 生成token
    const token = jwt.sign(user, this.config.managementLogin.secretKey, {
      expiresIn: expires,
    });
    return {
      access_token: token,
      expires_in: Math.floor(Date.now() / 1000) + expires,
      token_type: 'Bearer',
    };
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
  async spider() {
    const { ctx } = this;
    const res = await superagent.get('https://coincodex.com/ieo/top-network/');
    const msg = ctx.msg.success;
    const result = this.getCoinObj(res);
    await ctx.service.oss.uploadFile(result.logo);
    ctx.body = {
      ...msg,
      data: result,
      html: res.text
    }
  }
  loadCoinList(html) {
    const { ctx } = this;
    let $ = cheerio.load(html);
    let list = [];
    $('tbody tr.ico-calendar-entry').each((idx, ele) => {
      list.push({
        link: $(ele).find('td.entry-name a').attr('href'),
        logo: $(ele).find('td.entry-name a .ico-logo-wrapper img').attr('src'),
        symbol: $(ele).find('span.ico-symbol').html(),
        name: $(ele).find('span.ico-name').html(),
      })
    });
    console.log(list);
    return list;
  }
  async coinlist() {
    const { ctx } = this;
    let html = '';
    try {
      html = await nightmare
        .goto('https://coincodex.com/ieo-list/')
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
    console.log(html);
    const coinList = this.loadCoinList(html)
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: coinList
    }

  }
}


module.exports = ManagementController;
