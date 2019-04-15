'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    const { ctx } = this;
    const nickname = await ctx.model.User.find({ where: { nickname: user.nickname } });
    if (nickname !== null) {
      return ctx.msg.nameUsed;
    }
    const userRow = await this.find(user.address);
    if (userRow === null) {
      const ret = ctx.msg.success;
      const nowUnixTime = ctx.helper.nowUnixTime();
      this.logger.info('user %j', user);
      this.logger.info('ret %j', ret);
      const createResult = await ctx.model.User.create({
        ...user,
        createTime: nowUnixTime,
        lastLoginTime: nowUnixTime,
        lastLoginIP: ctx.ip,
      });
      ret.data = createResult;
      return ret;
    }
    return ctx.msg.userExists;
  }
  async find(id) {
    return this.ctx.model.User.find({ where: { id } });
  }
}

module.exports = UserService;
