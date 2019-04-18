'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  // sendcloud 发送短信验证码
  async send() {
    const { ctx } = this;
    const { mail } = ctx.request.body;
    const ret = await ctx.service.mail.send(mail);
    ctx.body = ret;
  }

  // 验证手机号
  async verify() {
    const { ctx } = this;
  }
}

module.exports = MailController;
