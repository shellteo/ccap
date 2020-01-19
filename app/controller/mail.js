'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  // 邮箱验证码
  async send() {
    const { ctx } = this;
    const { mail } = ctx.request.body;
    // 判断邮箱是否注册
    const userRow = await ctx.service.user.find(mail);
    if (userRow !== null) {
      ctx.body = ctx.msg.mailHadUsed;
    } else {
      ctx.body = await ctx.service.mail.send(mail);
    }
  }
}

module.exports = MailController;
