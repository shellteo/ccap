'use strict';

const Controller = require('egg').Controller;

class StageController extends Controller {
  async show() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.stage.find(symbol);
    ctx.body = msg;
  }
}

module.exports = StageController;
