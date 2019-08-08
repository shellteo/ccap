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
  async spider() {
    const { ctx } = this;
    const result = await ctx.service.crawler.detail('/ieo/top-network/')
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
  async coinlist() {
    const { ctx } = this;
    // https://coincodex.com/ico-calendar/
    // https://coincodex.com/ieo-list/
    // https://coincodex.com/sto-list/
    /*
    * detail_link
    * logo
    * symbol
    * coin_name
    * belong: 0  // 属于什么，0:ICOs,1:STOs,2:IEOs
    * */
    const result = await ctx.service.crawler.list('https://coincodex.com/sto-list/', 1)
    for(let item of result) {
      try {
        await ctx.service.coin.create(item)
      } catch (e) {
        console.error('写入数据库报错', item);
      }
    }
    const msg = ctx.msg.success;
    ctx.body = {
      ...msg,
      data: result
    }
  }
}

module.exports = ManagementController;
