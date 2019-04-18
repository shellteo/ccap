'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { email, password, code } = ctx.request.body;
    const verifyCode = await ctx.service.mail.verify(email, code);
    if (!verifyCode) {
      ctx.body = ctx.msg.codeError;
      return;
    }
    const user = {
      email,
      password,
    };
    const ret = await ctx.service.user.create(user);
    if (ret.code === 0) {
      await this.jwtSign(user);
    } else {
      ctx.body = ret;
    }
  }
  async login() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    const userRow = await ctx.service.user.find(email);
    if (userRow === null) {
      ctx.body = ctx.msg.userNotExist;
    } else if (userRow.password !== ctx.helper.md5(password)) {
      ctx.body = ctx.msg.psdError;
    } else {
      const user = {
        email,
        password,
      };
      await this.jwtSign(user);
    }
  }
  async jwtSign(user) {
    const { ctx, config } = this;
    const token = jwt.sign(user, config.login.secretKey, {
      expiresIn: config.login.expires,
    });
    const ret = ctx.msg.success;
    ret.data = {
      access_token: token,
      expires_in: Math.floor(Date.now() / 1000) + this.config.login.expires,
    };
    ctx.body = ret;
  }
  async upload() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = UserController;
