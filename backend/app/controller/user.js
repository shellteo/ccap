'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const md5 = require('crypto-js/md5');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { email, password, code } = ctx.request.body;
    const verifyCode = await ctx.service.mail.verify(email, code);
    if (!verifyCode) {
      ctx.body = ctx.msg.codeError;
      return;
    }
    const user = {
      email,
      password,
    };
    const ret = await ctx.service.user.create(user);
    if (ret.code === 0) {
      await this.jwtSign({
        id: ret.id,
        email
      }, { email });
    } else {
      ctx.body = ret;
    }
  }
  async login() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    const userRow = await ctx.service.user.find(email);
    if (userRow === null) {
      ctx.body = ctx.msg.userNotExist;
    } else if (userRow.password !== ctx.helper.md5(password)) {
      ctx.body = ctx.msg.psdError;
    } else {
      const user = {
        id: userRow.id,
        email,
      };
      const { nickname, avatar, bio } = userRow;
      await this.jwtSign(user, { email, nickname, avatar, bio });
    }
  }
  async jwtSign(user, {email = null, nickname = null, avatar = null, bio = null}) {
    const { ctx, config } = this;
    const token = jwt.sign(user, config.login.secretKey, {
      expiresIn: config.login.expires,
    });
    const ret = ctx.msg.success;
    ret.data = {
      access_token: token,
      expires_in: Math.floor(Date.now() / 1000) + this.config.login.expires,
      nickname,
      avatar,
      email,
      bio
    };
    ctx.body = ret;
  }
  async userInfo() {
    const { ctx } = this;
    const email = ctx.user.email;
    const userRow = await ctx.service.user.find(email);
    if (userRow === null) {
      ctx.body = ctx.msg.userNotExist;
    } else {
      const { nickname, avatar, bio } = userRow;
      ctx.body = {
        ...ctx.msg.success,
        data: {
          nickname,
          avatar,
          email,
          bio
        }
      }
    }
  }
  async update() {
    const { ctx } = this;
    const email = ctx.user.email;
    const { nickname, bio, avatar } = ctx.request.body;
    const userRow = await ctx.service.user.update({nickname, bio, avatar}, email);
    ctx.body = {
      ...ctx.msg.success,
      data: userRow
    };

  }
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const filetype = file.filename.split('.');

    // 文件上OSS的路径
    const filename = '/avatar/'
      + moment().format('YYYY/MM/DD/')
      + md5(file.filepath).toString()
      + '.' + filetype[filetype.length - 1];

    // // 文件在本地的缓存路径
    // const filelocation = 'uploads/' + path.basename(file.filename);

    // filepath需要再改
    const uploadStatus = await this.service.user.uploadImage(filename, file.filepath);

    if (uploadStatus !== 0) {
      ctx.body = ctx.msg.uploadFailure;
      return;
    }

    ctx.body = ctx.msg.success;
    ctx.body.data = { url: filename };
  }
}

module.exports = UserController;
