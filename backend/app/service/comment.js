'use strict';
const Service = require('egg').Service;

class CommentService extends Service {
  async list(offset, limit, symbol) {
    const { ctx } = this;
    const result = {};
    result.count = await ctx.model.Comment.count({ where: { symbol } });
    result.rows = await ctx.model.Comment.findAll({ offset, limit, where: { symbol } });
    return result;
  }
  async create({ symbol, email, content, rating }) {
    const { ctx } = this;
    const userRow = await ctx.service.user.find(email);
    if (userRow === null) {
      return ctx.msg.userNotExist;
    }
    const ieoRow = await ctx.service.coin.find(symbol);
    if (ieoRow === null) {
      return ctx.msg.ieoNotExist;
    }
    const nowUnixTime = ctx.helper.nowUnixTime();
    const data = await ctx.model.Comment.create({
      symbol,
      createUserEmail: email,
      createUserName: userRow.nickname,
      createUserAvatar: userRow.avatar,
      rating,
      content,
      createTime: nowUnixTime,
    });
    const result = ctx.msg.success;
    return {
      ...result,
      data,
    };
  }
  async find(symbol) {
    const { ctx } = this;
    return ctx.model.Comment.findAll({ where: { symbol } });
  }
  async likeComment(id) {
    const { ctx } = this;
    const comment = await ctx.model.Comment.findById(id)
    return comment.increment('liked');
  }
}

module.exports = CommentService;
