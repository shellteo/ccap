'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async create() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = CommentController;
