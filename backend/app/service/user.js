'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create({ email, password }) {
    const { ctx } = this;
    const userRow = await ctx.model.User.find({ where: { email } });
    if (userRow !== null) {
      return ctx.msg.mailHadUsed;
    }
    const ret = ctx.msg.success;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const createResult = await ctx.model.User.create({
      email,
      password: ctx.helper.md5(password),
      createTime: nowUnixTime,
      lastLoginTime: nowUnixTime,
      lastLoginIP: ctx.ip,
    });
    ret.data = createResult;
    return ret;
  }
  async find(email) {
    const { ctx } = this;
    return ctx.model.User.find({ where: { email } });
  }
}

module.exports = UserService;
