'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async create() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async destroy() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = FavoriteController;
