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
    detail_link,
    init_price,
    launchpad,
    roi,
    for_sale,
    softcap,
    hardcap,
    raised,
    bonuses,
    bounties,
    distribution,
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
      detail_link,
      init_price,
      launchpad,
      roi,
      for_sale,
      softcap,
      hardcap,
      raised,
      bonuses,
      bounties,
      distribution,
      createTime: nowUnixTime,
    });
    ret.data = createResult;
    return ret;
  }
  async find(symbol) {
    const { ctx } = this;
    const sql = 'SELECT round(AVG(`rating`),2) AS avgRating FROM `comment` WHERE `symbol` = :symbol ';
    const ret2 = await ctx.model.query(sql, {
      raw: true,
      model: ctx.model.Comment,
      replacements: { symbol },
    });
    const ret = await ctx.model.Coin.find({ where: { symbol } });
    if (ret2[0].avgRating) {
      return {
        ...ret.dataValues,
        rating: ret2[0].avgRating,
      };
    }
    return ret;
  }
  async findById(id) {
    const { ctx } = this;
    return ctx.model.Coin.find({ where: { id } });
  }
  async findDel() {
    const { ctx } = this;
    return ctx.model.Coin.findAll({ where: { isDelete: 1 } });
  }
  async list(offset, limit, { status, name, belong }) {
    const { ctx } = this;
    const { isNull } = ctx.helper;
    const result = {};
    if (ctx.helper.isNull(status) && ctx.helper.isNull(name) && ctx.helper.isNull(belong)) {
      result.count = await ctx.model.Coin.count();
      result.rows = await ctx.model.Coin.findAll({ offset, limit });
    } else {
      let sql = 'SELECT * FROM coin';
      let countSql = 'SELECT COUNT(1) as count FROM coin';
      const whereArr = [];
      const replaceArr = {};
      if (!isNull(belong)) {
        whereArr.push('`belong` = :belong');
        replaceArr.belong = belong;
      }
      if (!ctx.helper.isNull(name)) {
        whereArr.push('(symbol LIKE :Name OR coin_name LIKE :Name)');
        replaceArr.Name = `%${name}%`;
      }
      // status: ongoing[进行中], upcoming[未开始], ended[已结束]
      if (!ctx.helper.isNull(status)) {
        if (status === 'ongoing') {
          whereArr.push('(`start` <= UNIX_TIMESTAMP(NOW()) AND `end` >= UNIX_TIMESTAMP(NOW()))');
        }
        if (status === 'upcoming') {
          whereArr.push('`start` >= UNIX_TIMESTAMP(NOW())');
        }
        if (status === 'ended') {
          whereArr.push('`end` <= UNIX_TIMESTAMP(NOW())');
        }
      }
      if (whereArr.length > 0) {
        const whereStr = ' WHERE ' + whereArr.join(' AND ');
        sql += whereStr;
        countSql += whereStr;

      }
      sql += ' LIMIT :offset, :limit ';
      result.rows = await ctx.model.query(sql, {
        raw: true,
        model: ctx.model.Coin,
        replacements: { ...replaceArr, offset, limit },
      });
      const count = await ctx.model.query(countSql, {
        raw: true,
        model: ctx.model.Coin,
        replacements: { ...replaceArr, offset, limit },
      });
      result.count = count[0].count;
    }
    return result;
  }
  async update(symbol, coinObj) {
    const { ctx } = this;
    let result = {};
    if (!ctx.helper.isNull(coinObj)) {
      result = await ctx.model.Coin.update(coinObj, { where: { symbol } });
    }
    return result;
  }
  async updateById(id, coinObj) {
    const { ctx } = this;
    let result = {};
    if (!ctx.helper.isNull(coinObj)) {
      result = await ctx.model.Coin.update(coinObj, { where: { id } });
    }
    return result;
  }
  async createSome(coinObj) {
    const { ctx } = this;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const ret = await ctx.model.Coin.create({
      ...coinObj,
      createTime: nowUnixTime,
    });
    return ret;
  }
}

module.exports = CoinService;
