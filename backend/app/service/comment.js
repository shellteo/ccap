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
  // 1：已经点过赞了，0：点赞成功，2：点赞失败
  async likeComment(comment_id) {
    const { ctx } = this;
    const user_id = ctx.user.id;

    const userLiked = await ctx.model.UserLike.find({ where: { user_id, comment_id  } });
    // 已经点过赞了
    if (userLiked) {
      return 1;
    }

    const transaction = await ctx.model.transaction();
    /* const trans = await ctx.model.transaction({
      isolationLevel: this.app.Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ, // SERIALIZABLE,
    }); */
    try {
      await ctx.model.UserLike.create({
        user_id, comment_id
      }, { transaction });
      const comment = await ctx.model.Comment.findById(comment_id);
      await comment.increment('liked', { transaction });
      await transaction.commit();
      return 0;
    } catch (e) {
      this.logger.error('In UserController::userinfo error %j', e);
      await transaction.rollback();
      return 2;
    }
  }
}

module.exports = CommentService;
