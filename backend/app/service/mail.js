'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class mailService extends Service {
  // 发送验证码服务
  async send() {
    const { ctx } = this;
    const transporter = nodemailer.createTransport({
      // host: 'smtp.ethereal.email',
      service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      secureConnection: true, // 使用了 SSL
      auth: {
        user: 'shellteo@163.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'Zx1994163',
      },
    });
    const randomNumber = ctx.helper.randomNumber(6);
    const mailOptions = {
      from: '"MaxWell服务邮件" <shellteo@163.com>', // sender address
      to: '767070256@qq.com', // list of receivers
      subject: 'MaxWell注册服务', // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `<p>您的验证码：<b>${randomNumber}</b></p>`, // html body
    };

    // send mail with defined transport object
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (e) {
      console.log(e);
    }
  }

  // 验证验证码服务
  async verify(phone, verifyCode) {
    const ret = await this.app.redis.get(`sms:register:${phone}`);
    return ret === verifyCode;
  }
}

module.exports = mailService;
