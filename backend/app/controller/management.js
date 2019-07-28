'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')

class ManagementController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (username === this.config.login.username && password === this.config.login.password) {
      const msg = ctx.msg.success;
      msg.data = this.jwtSign({username, password});
      ctx.body = msg;
    } else {
      ctx.body = ctx.msg.loginFailed;
    }
  }
  // jwt签名
  jwtSign(user) {
    // 过期时间
    const expires = this.config.managementLogin.expires;
    // 生成token
    const token = jwt.sign(user, this.config.managementLogin.secretKey, {
      expiresIn: expires,
    });
    return {
      access_token: token,
      expires_in: Math.floor(Date.now() / 1000) + expires,
      token_type: 'Bearer',
    };
  }
}

module.exports = ManagementController;
