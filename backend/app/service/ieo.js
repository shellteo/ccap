'use strict';

const Service = require('egg').Service;

class IEOService extends Service {
  async create({
    symbol, // ieo符号，如：BLOC
    name, // ieo名称，如BlockCloud
    bio, // ieo介绍
    logo, // ieo logo
    exchange, // 交易所
    platform, // 交易所 launchpad平台
    exchangeLink, // 交易所链接
    platformLink, // launchpad平台链接
    detailLink, // 详情
    website, // 网站详情，如：www.top.network
    startTime, // ieo开始时间
    endTime, // ieo结束时间
  }) {
    const { ctx } = this;
    const ret = ctx.msg.success;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const createResult = await ctx.model.Ieo.create({
      symbol,
      name,
      bio,
      logo,
      exchange,
      platform,
      exchangeLink,
      platformLink,
      detailLink,
      website,
      startTime,
      endTime,
      createTime: nowUnixTime,
    });
    ret.data = createResult;
    return ret;
  }
  async find(email) {
    const { ctx } = this;
    return ctx.model.User.find({ where: { email } });
  }
  async list(offset, limit, { status, query }) {
    const { ctx } = this;
    const result = {};
    if (ctx.helper.isNull(status) && ctx.helper.isNull(query)) {
      result.count = await ctx.model.Ieo.count();
      result.rows = await ctx.model.Ieo.findAll({ offset, limit });
    } else {
      let sql = '';
      if (!ctx.helper.isNull(query)) {
        sql = 'SELECT * FROM ieo WHERE symbol LIKE \'%:Name%\' OR name LIKE \'%:Name%\' ';
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
        model: ctx.model.Ieo,
        replacements: { Name: query, offset, limit },
      });
    }
    return result;
  }
}

module.exports = IEOService;
