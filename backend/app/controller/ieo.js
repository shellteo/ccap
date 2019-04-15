'use strict';

const Controller = require('egg').Controller;

class IEOController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async show() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = IEOController;
