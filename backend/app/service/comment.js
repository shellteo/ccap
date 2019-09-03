'use strict';
const Service = require('egg').Service;

class CommentService extends Service {
  async list(offset, limit, symbol) {
    const { ctx } = this;
    const result = {};
    let sql = '';
    const replacements = {
      symbol,
      limit,
      offset,
    };
    if (ctx.user && ctx.user.id) {
      sql = `SELECT c.*, ur.email, ur.avatar, ur.nickname, (CASE uk.user_id WHEN :userId THEN TRUE ELSE  FALSE END) AS islike 
      FROM comment AS c 
      LEFT JOIN user_like AS uk 
      ON uk.comment_id=c.id
      LEFT JOIN user AS ur 
      ON c.createUserId=ur.id
      WHERE c.symbol=:symbol 
      GROUP BY c.id HAVING islike>-1
      ORDER BY c.createTime DESC
      LIMIT :limit OFFSET :offset`;
      replacements.userId = ctx.user.id;
    } else {
      sql = `SELECT c.*, ur.email, ur.avatar, ur.nickname
      FROM comment c 
      LEFT JOIN user ur 
      ON c.createUserId = ur.id 
      WHERE c.symbol=:symbol 
      ORDER BY c.createTime DESC
      LIMIT :limit OFFSET :offset `;
    }
    result.count = await ctx.model.Comment.count({ where: { symbol } });
    result.rows = await ctx.model.query(sql, {
      raws: true,
      model: ctx.model.Comment,
      replacements,
    });
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
      createUserId: userRow.id,
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

    this.logger.error('in service::comment like Comment user %j', ctx.user);

    const userLiked = await ctx.model.UserLike.find({ where: { user_id, comment_id } });
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
        user_id, comment_id,
      }, { transaction });
      const comment = await ctx.model.Comment.findById(comment_id);
      await comment.increment('liked', { transaction });
      await transaction.commit();
      return 0;
    } catch (e) {
      this.logger.error('in service::comment like Comment error %j', e);
      await transaction.rollback();
      return 2;
    }
  }
}

module.exports = CommentService;
