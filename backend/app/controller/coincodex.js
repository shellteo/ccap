'use strict';

const Controller = require('egg').Controller;

class coincodexController extends Controller {
  async all_coins() {
    const { ctx } = this;

    const ret = await ctx.curl('https://coincodex.com/apps/coincodex/cache/all_coins.json', {
      dataType: 'json',
      timeout: [ 30000, 30000 ],
    });
    ctx.body = {
      ...ctx.msg.success,
      data: ret
    }
  }
  async get_firstpage_history() {
    const { ctx } = this;
    const { days, samples, coins_limit } = ctx.params;
    ctx.body = {
      ...ctx.msg.success,
      data: { days, samples, coins_limit }
    }
  }
  async get_coin() {
    const { ctx } = this;
    const { symbol } = ctx.params;
    const ret = await ctx.curl(`https://coincodex.com/api/coincodex/get_coin/${symbol}`, {
      dataType: 'json',
      timeout: [ 30000, 30000 ],
    });
    ctx.body = {
      ...ctx.msg.success,
      data: ret.data
    }
  }
  async get_coin_history() {
    const { ctx } = this;
    const { symbol, start_date, end_date, samples } = ctx.params;

    const ret = await ctx.curl(`https://coincodex.com/api/coincodex/get_coin_history/${symbol}/${start_date}/${end_date}/${samples}`, {
      dataType: 'json',
      timeout: [ 30000, 30000 ],
    });
    ctx.body = {
      ...ctx.msg.success,
      data: ret.data
    }
  }
  async get_markets_by_coin() {
    const { ctx } = this;
    const { symbol } = ctx.params;
    const ret = await ctx.curl(`https://coincodex.com/api/exchange/get_markets_by_coin/${symbol}`, {
      dataType: 'json',
      timeout: [ 30000, 30000 ],
    });
    ctx.body = {
      ...ctx.msg.success,
      data: ret.data
    }
  }
  async get_coin_ranges() {

  }
}

module.exports = coincodexController;
