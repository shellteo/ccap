'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async create({
    symbol,
    from,
    media,
    publishTime,
    mediaLogo,
    title,
    link,
  }) {
    const { ctx } = this;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const ret = await ctx.model.News.create({
      symbol,
      from,
      media,
      publishTime,
      mediaLogo,
      title,
      link,
      createTime: nowUnixTime,
    });
    return ret;
  }
  async count(symbol) {
    const { ctx } = this;
    const count = await ctx.model.News.count({where: {symbol}});
    return count;
  }
  async find(symbol) {
    const { ctx } = this;
    const sql = ' Select distinct link,`from`,media,publishTime,mediaLogo,title FROM news WHERE symbol = :symbol'
    const rows = await ctx.model.query(sql, {
      raws: true,
      model: ctx.model.News,
      replacements: { symbol },
    });
    return rows;
  }
}

module.exports = NewsService;
