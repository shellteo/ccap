'use strict';

const Controller = require('egg').Controller;

class CoinController extends Controller {
  async index() {
    const { ctx } = this;
    const msg = ctx.msg.success;
    const pageSize = parseInt(ctx.query.pageSize || 10);
    const pageIndex = parseInt(ctx.query.pageIndex || 1);
    const offset = (pageIndex - 1) * pageSize;
    // status分为，所有，未开始，进行中，已结束，
    // 名称可以搜索 symbol 和 name
    const {
      status,
      name,
      belong
    } = ctx.query;
    msg.data = await ctx.service.coin.list(offset, pageSize, {
      status,
      name,
      belong
    });
    ctx.body = msg;
  }
  async show() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.coin.find(symbol);
    ctx.body = msg;
  }
  async create() {
    const { ctx } = this;
    const {
      logo,
      symbol,
      coin_name,
      shortname,
      slug,
      display_symbol,
      display,
      release_date,
      ico_price,
      today_open,
      description,
      start,
      end,
      is_promoted,
      message,
      website,
      whitepaper,
      total_supply,
      supply,
      platform,
      how_to_buy_url,
      trading_since,
      stages_start,
      stages_end,
      belong,
      rating,
    } = ctx.request.body;
    const ret = await ctx.service.coin.create({
      logo,
      symbol,
      coin_name,
      shortname,
      slug,
      display_symbol,
      display,
      release_date,
      ico_price,
      today_open,
      description,
      start,
      end,
      is_promoted,
      message,
      website,
      whitepaper,
      total_supply,
      supply,
      platform,
      how_to_buy_url,
      trading_since,
      stages_start,
      stages_end,
      belong,
      rating,
    });
    ctx.body = ret;
  }
  async update() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const data = ctx.request.body;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.coin.update(symbol, data);
    ctx.body = msg;
  }
}

module.exports = CoinController;
