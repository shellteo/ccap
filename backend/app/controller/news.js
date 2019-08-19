'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async show() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const msg = ctx.msg.success;
    msg.data = await ctx.service.news.find(symbol);
    ctx.body = msg;
  }
}

module.exports = NewsController;
