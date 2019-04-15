'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { email, nickname, sign } = ctx.request.body;
    const user = {
      email,
      nickname,
      sign,
    };
    const ret = await ctx.service.user.create(user);
    ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
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
