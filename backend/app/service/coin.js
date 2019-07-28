'use strict';

const Service = require('egg').Service;

class CoinService extends Service {
  async create({
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
  }) {
    const { ctx } = this;
    const ret = ctx.msg.success;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const createResult = await ctx.model.Coin.create({
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
      createTime: nowUnixTime,
    });
    ret.data = createResult;
    return ret;
  }
  async find(symbol) {
    const { ctx } = this;
    return ctx.model.Coin.find({ where: { symbol } });
  }
  async list(offset, limit, { status, query }) {
    const { ctx } = this;
    const result = {};
    if (ctx.helper.isNull(status) && ctx.helper.isNull(query)) {
      result.count = await ctx.model.Coin.count();
      result.rows = await ctx.model.Coin.findAll({ offset, limit });
    } else {
      let sql = '';
      if (!ctx.helper.isNull(query)) {
        sql = 'SELECT * FROM coin WHERE symbol LIKE \'%:Name%\' OR name LIKE \'%:Name%\' ';
      }
      // status: ongoing[进行中], upcoming[未开始], ended[已结束]
      if (!ctx.helper.isNull(status)) {
        if (status === 'ongoing') {
          sql += 'OR startTime <= UNIX_TIMESTAMP(NOW()) AND endTime >= UNIX_TIMESTAMP(NOW())';
        }
        if (status === 'upcoming') {
          sql += 'OR startTime >= UNIX_TIMESTAMP(NOW()) ';
        }
        if (status === 'ended') {
          sql += 'endTime <= UNIX_TIMESTAMP(NOW())';
        }
      }
      sql += ' LIMIT :offset, :limit ';
      result.rows = await ctx.model.query(sql, {
        raw: true,
        model: ctx.model.Coin,
        replacements: { Name: query, offset, limit },
      });
    }
    return result;
  }
  async update(symbol, coinObj) {
    const {ctx} = this;
    let result = {};
    if (!ctx.helper.isNull(coinObj)) {
      result = await ctx.model.Coin.update(coinObj, { where: { symbol } });
    }
    return result;
  }
}

module.exports = CoinService;
