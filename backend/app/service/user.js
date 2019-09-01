'use strict';

const Service = require('egg').Service;
const fs = require('fs');

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
  async update({ nickname = null, bio = null, avatar = null }, email) {
    const { ctx } = this;
    const updates = {};
    if (nickname) updates.nickname = nickname;
    if (bio) updates.bio = bio;
    if (avatar) updates.avatar = avatar;
    ctx.model.User.update(updates, {
      where: { email },
    });
  }
  async uploadImage(filename, filelocation) {
    const { ctx } = this;

    let result = null;
    try {
      result = await ctx.oss.put(filename, filelocation);
      await fs.unlinkSync(filelocation);
    } catch (err) {
      this.app.logger.error('PostService:: uploadImage error: %j', err);
      return 2;
    }

    if (!result) {
      return 3;
    }

    this.app.logger.info('PostService:: uploadImage success: ' + filename);
    return 0;
  }
}

module.exports = UserService;
