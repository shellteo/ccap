'use strict';

const Controller = require('egg').Controller;

class GeetestController extends Controller {
  // 向极验申请每次验证所需的challenge
  async register() {
    const ctx = this.ctx;
    let data;
    try {
      data = await ctx.service.geetest.register();
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
