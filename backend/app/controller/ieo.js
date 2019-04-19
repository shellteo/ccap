'use strict';

const Controller = require('egg').Controller;

class IEOController extends Controller {
  async index() {
    const { ctx } = this;
    const msg = ctx.msg.success;
    const pageSize = parseInt(ctx.query.pageSize);
    const pageIndex = parseInt(ctx.query.pageIndex);
    const offset = (pageIndex - 1) * pageSize;
    // status分为，所有，未开始，进行中，已结束，
    // 名称可以搜索 symbol 和 name
    const {
      status,
      query,
    } = ctx.query;
    msg.data = await ctx.service.ieo.list(offset, pageSize, {
      status,
      query,
    });
  }
  async show() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async create() {
    const { ctx } = this;
    const {
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
    } = ctx.request.body;
    const ret = await ctx.service.ieo.create({
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
    });
    ctx.body = ret;
  }
}

module.exports = IEOController;
