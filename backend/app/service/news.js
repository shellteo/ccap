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
    const ret = await ctx.model.Stage.create({
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
}

module.exports = NewsService;
