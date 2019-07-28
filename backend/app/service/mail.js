'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class mailService extends Service {
  // 发送验证码服务
  async send(toMail) {
    const { ctx, app } = this;
    const transporter = nodemailer.createTransport({
      // host: 'smtp.ethereal.email',
      service: '126', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      secureConnection: true, // 使用了 SSL
      auth: {
        user: 'chattingroom@126.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'Zx1994163',
      },
    });
    const randomNumber = ctx.helper.randomNumber(6);
    // 过期时间：秒
    app.redis.set(`register:${toMail}`, randomNumber, 'EX', 600);
    const mailOptions = {
      from: '"什么币值得买服务邮件" <chattingroom@126.com>', // sender address
      to: toMail, // list of receivers
      subject: '什么币值得买注册服务', // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `<p>您的验证码：<b>${randomNumber}</b></p>`, // html body
    };

    // send mail with defined transport object
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return ctx.msg.success;
    } catch (e) {
      console.log(e);
      return ctx.msg.mailSendFailed;
    }
  }

  // 验证验证码服务
  async verify(mail, verifyCode) {
    const ret = await this.app.redis.get(`register:${mail}`);
    return ret === verifyCode;
  }
}

module.exports = mailService;
