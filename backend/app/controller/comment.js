'use strict';

const Controller = require('egg').Controller;

class commentController extends Controller {
  async index() {
    const { ctx } = this;
    let { pageSize = 10, pageIndex = 1, symbol } = ctx.query;
    pageSize = parseInt(pageSize);
    pageIndex = parseInt(pageIndex);
    const offset = (pageIndex - 1) * pageSize;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.comment.list(offset, pageSize, symbol);
    ctx.body = msg;
  }
  async create() {
    const { ctx } = this;
    const { content, rating, symbol } = ctx.request.body;
    const email = ctx.user.email;
    const ret = await ctx.service.comment.create({ symbol, email, rating, content });
    ctx.body = ret;
  }
  async show() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const data = await ctx.service.comment.find(symbol);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async likeComment() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await ctx.service.comment.likeComment(id);
    if (data === 1) {
      ctx.body = ctx.msg.hasLiked
    } else if (data === 2) {
      ctx.body = ctx.msg.likedFailure
    } else {
      ctx.body = ctx.msg.success
    }
  }
}

module.exports = commentController;
