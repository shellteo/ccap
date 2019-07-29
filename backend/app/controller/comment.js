'use strict';

const Controller = require('egg').Controller;

class commentController extends Controller {
  async index() {
    const { ctx } = this;
    let { pageSize = 10, pageIndex = 1, ieoId } = ctx.query;
    pageSize = parseInt(pageSize);
    pageIndex = parseInt(pageIndex);
    const offset = (pageIndex - 1) * pageSize;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.comment.list(offset, pageSize, ieoId);
    ctx.body = msg;
  }
  async create() {
    const { ctx } = this;
    const { content, symbol } = ctx.request.body;
    const email = ctx.user.email;
    const ret = await ctx.service.comment.create({ symbol, email, content });
    ctx.body = ret;
  }
}

module.exports = commentController;
