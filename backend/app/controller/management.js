'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
const ico = require('../public/ico.json')
const ieo = require('../public/ieo.json')
const sto = require('../public/sto.json')
const del = require('../public/del.json')

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
  async spider() {
    const { ctx } = this;
    // const result = await ctx.service.crawler.detail('/ieo/top-network/')
    const result = await ctx.service.coin.list(0, 1000, {})
    const ixo = result.rows;
    const l = ixo.length;
    for (let i=0; i<10; i++) {
      const id = ixo[i].id;
      const belong = ixo[i].belong;
      const coin_name = ixo[i].coin_name;
      const detail_link = ixo[i].detail_link;
      const ajaxData = await ctx.service.coincodex.get_coin(ixo[i].symbol, coin_name);
      ctx.logger.info('ajax info', ajaxData);

      const symbol = ajaxData.symbol;
      const detailData = await ctx.service.crawler.detail(detail_link);
      let init_price_key = ['ico_price', 'sto_price', 'ieo_price'];
      let init_price = detailData.funding[init_price_key[belong]] || '';
      let crawlerObj = {
        rating: detailData.rating,
        init_price,
        launchpad: detailData.funding.launchpad || '',
        roi: detailData.funding.roi || '',
        for_sale: detailData.funding.for_sale || '',
        softcap: detailData.funding.softcap || '',
        hardcap: detailData.funding.hardcap || '',
        raised: detailData.funding.raised || '',
        bonuses: detailData.funding.bonuses || '',
        bounties: detailData.bounties || '',
        distribution: detailData.distribution || '{}',
      }
      ctx.logger.info('crawlerObj', crawlerObj);

      const coinResult = await ctx.service.coin.updateById(id, {
        ...ajaxData,
        ...crawlerObj
      });

      ctx.logger.info('update coin', coinResult);
      const { stages = [], news = [] } = detailData
      for (let j=0; j<stages.length; j++) {
        const stageResult = await ctx.service.stage.create({
          symbol,
          ...stages[i]
        });
        ctx.logger.info('create stage', stageResult);
      }
      for (let j=0; j<news.length; j++) {
        const newsResult = await ctx.service.stage.create({
          symbol,
          mediaLogo: '',
          ...news[i]
        });
        ctx.logger.info('create news', newsResult);
      }
    }
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async coinlist() {
    const { ctx } = this;
    // https://coincodex.com/ico-calendar/
    // https://coincodex.com/ieo-list/
    // https://coincodex.com/sto-list/
    /*
    * detail_link
    * logo
    * symbol
    * coin_name
    * belong: 0  // 属于什么，0:ICOs,1:STOs,2:IEOs
    * */
    const calendar = {
      ico: {
        url: 'https://coincodex.com/ico-calendar/',
        idx: 0,
        filename: 'ico.json'
      },
      sto: {
        url: 'https://coincodex.com/sto-list/',
        idx: 1,
        filename: 'sto.json'
      },
      ieo: {
        url: 'https://coincodex.com/ieo-list/',
        idx: 2,
        filename: 'ieo.json'
      },
    };
    /*const current = calendar.ieo;
    const result = await ctx.service.crawler.list(current.url, current.idx);
    // 写入文件
    await ctx.service.oss.wfile(result,current.filename);*/
    // 存储到数据库
    const result = [
      ...ico,
      ...sto,
      ...ieo
    ];
    for(let item of result) {
      try {
        await ctx.service.coin.createSome(item)
      } catch (e) {
        console.error('写入数据库报错', item);
      }
    }
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async getCrawler() {
    const { ctx } = this;
    const coin = ctx.query.coin
    const result = await ctx.service.crawler.detail(coin) // '/ieo/top-network/'
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async updateCoin() {
    console.log('updateCoin');
    const { ctx } = this;
    const result = await ctx.service.coin.list(0, 1000, {})
    /*const ixo = result.rows;
    const l = ixo.length;
    for (let i=165; i<l; i++) {
      if(Boolean(ixo[i].isDelete)) continue;
      const id = ixo[i].id;
      const belong = ixo[i].belong;
      const coin_name = ixo[i].coin_name;
      const detail_link = ixo[i].detail_link;
      const ajaxData = await ctx.service.coincodex.get_coin(ixo[i].symbol, coin_name);
      ctx.logger.info('ajax info', ajaxData);

      const symbol = ajaxData.symbol;
      const detailData = await ctx.service.crawler.detail(detail_link);
      let init_price_key = ['ico_price', 'sto_price', 'ieo_price'];
      let init_price = detailData.funding[init_price_key[belong]] || '';
      let crawlerObj = {
        rating: detailData.rating,
        init_price,
        launchpad: detailData.funding.launchpad || '',
        roi: detailData.funding.roi || '',
        for_sale: detailData.funding.for_sale || '',
        softcap: detailData.funding.softcap || '',
        hardcap: detailData.funding.hardcap || '',
        raised: detailData.funding.raised || '',
        bonuses: detailData.funding.bonuses || '',
        bounties: detailData.bounties || '',
        distribution: detailData.distribution || '{}',
      }
      ctx.logger.info('crawlerObj', crawlerObj);
      let updateObj = ajaxData === false ? {
        ...crawlerObj,
        isDelete: 1
      } : {
        ...ajaxData,
        ...crawlerObj
      };

      const coinResult = await ctx.service.coin.updateById(id, updateObj);

      ctx.logger.info('update coin', coinResult);
    }*/
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async insertCoin() {
    const { ctx } = this;
    const msg = ctx.msg.success;
    const result = await ctx.service.stage.list();
    // const result = await ctx.service.coin.findDel();
    /*const result = await ctx.service.coin.list(0, 1000, {})
    const ixo = result.rows;
    const l = ixo.length;
    for (let i=0; i<l; i++) {
      if(Boolean(ixo[i].isDelete)) continue;
      const id = ixo[i].id;
      const belong = ixo[i].belong;
      const coin_name = ixo[i].coin_name;
      const detail_link = ixo[i].detail_link;
      const ajaxData = await ctx.service.coincodex.get_coin(ixo[i].symbol, coin_name);
      ctx.logger.info('ajax info', ajaxData);

      const symbol = ajaxData.symbol;
      const detailData = await ctx.service.crawler.detail(detail_link);
      let init_price_key = ['ico_price', 'sto_price', 'ieo_price'];
      let init_price = detailData.funding[init_price_key[belong]] || '';
      let crawlerObj = {
        rating: detailData.rating,
        init_price,
        launchpad: detailData.funding.launchpad || '',
        roi: detailData.funding.roi || '',
        for_sale: detailData.funding.for_sale || '',
        softcap: detailData.funding.softcap || '',
        hardcap: detailData.funding.hardcap || '',
        raised: detailData.funding.raised || '',
        bonuses: detailData.funding.bonuses || '',
        bounties: detailData.bounties || '',
        distribution: detailData.distribution || '{}',
      };
      ctx.logger.info('crawlerObj', crawlerObj);
      let updateObj = ajaxData === false ? {
        ...crawlerObj,
        isDelete: 1
      } : {
        ...ajaxData,
        ...crawlerObj
      };

      const coinResult = await ctx.service.coin.updateById(id, updateObj);

      ctx.logger.info('update coin', coinResult);
    }*/
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async createStage() {
    const { ctx } = this;
    const result = await ctx.service.coin.list(0, 1000, {})
    const ixo = result.rows;
    const l = ixo.length;
    for (let i=425; i<l; i++) {
      if(Boolean(ixo[i].isDelete)) continue;
      const symbol = ixo[i].symbol;
      const detail_link = ixo[i].detail_link;

      const detailData = await ctx.service.crawler.detail(detail_link);
      const { stages = [] } = detailData;
      ctx.logger.info('stages', stages);

      for (let j=0; j<stages.length; j++) {
        const stageResult = await ctx.service.stage.create({
          symbol,
          ...stages[j]
        });
        ctx.logger.info('create stage success', stageResult.dataValues);
      }
    }
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async createNews() {
    const { ctx } = this;
    const result = await ctx.service.coin.list(0, 1000, {})
    const ixo = result.rows;
    const l = ixo.length;
    for (let i=393; i<l; i++) {
      if(Boolean(ixo[i].isDelete)) continue;
      const symbol = ixo[i].symbol;
      const detail_link = ixo[i].detail_link;

      const detailData = await ctx.service.crawler.detail(detail_link);
      const { news = [] } = detailData
      ctx.logger.info(`news' ${symbol}`, news);

      for (let j=0; j<news.length; j++) {
        const newsResult = await ctx.service.news.create({
          symbol,
          mediaLogo: '',
          ...news[j]
        });
        ctx.logger.info('create news success', newsResult.dataValues);
      }
    }
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
}

module.exports = ManagementController;
