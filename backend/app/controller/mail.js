'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  // sendcloud 发送短信验证码
  async send() {
    const { ctx } = this;
    await ctx.service.mail.send();
    ctx.body = ctx.msg.success;
  }

  // 验证手机号
  async verify() {
    const { ctx } = this;
  }
}

module.exports = MailController;
