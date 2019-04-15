'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async upload() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = UserController;
