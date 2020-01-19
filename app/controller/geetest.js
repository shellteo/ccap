'use strict';

const Controller = require('egg').Controller;
const Geetest = require('../geetest/gt-sdk');
const captcha = new Geetest({
  geetest_id: '9cfcd0fe19455cfd20f5c315dffc8386',
  geetest_key: 'ac4c9438ea7b258c4a6271926dd1e4c7',
});

class GeetestController extends Controller {
  // 请求geetest验证，获取验证参数
  async validate() {
    const ctx = this.ctx;
    const req = ctx.request;
    try {
      const success = await captcha.validate(false, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode,
      });
      if (!success) {
        // 二次验证失败
        ctx.body = { status: 'fail', info: '登录失败' };
      } else {
        ctx.body = { status: 'success', info: '登录成功' };
      }
    } catch (err) {
      ctx.body = { status: 'error', info: err };
    }
  }

  // 向极验申请每次验证所需的challenge
  async register() {
    const ctx = this.ctx;
    let data;
    try {
      data = await captcha.register(null);
      if (!data.success) {
        // req.session.fallback = true;
      } else {
        // req.session.fallback = false;
      }
      ctx.body = data;
    } catch (e) {
      ctx.status = 500;
      ctx.body = data;
    }

  }
}

module.exports = GeetestController;
