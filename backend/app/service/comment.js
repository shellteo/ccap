'use strict';
const Service = require('egg').Service;

class CommentService extends Service {
  async list(offset, limit, ieoId) {
    const { ctx } = this;
    const result = {};
    result.count = await ctx.model.Comment.count({ where: { ieoId } });
    result.rows = await ctx.model.Comment.findAll({ offset, limit, where: { ieoId } });
    return result;
  }
  async create({ symbol, email, content }) {
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
      content,
      createTime: nowUnixTime,
    });
    const result = ctx.msg.success;
    return {
      ...result,
      data,
    };
  }
}

module.exports = CommentService;
