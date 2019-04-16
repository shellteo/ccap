'use strict';

const Service = require('egg').Service;
const Geetest = require('../geetest/gt-sdk');
const captcha = new Geetest({
  geetest_id: '9cfcd0fe19455cfd20f5c315dffc8386',
  geetest_key: 'ac4c9438ea7b258c4a6271926dd1e4c7',
});

class GeeTestService extends Service {
  async validate(geetestObj) {
    try {
      const success = await captcha.validate(false, {
        geetest_challenge: geetestObj.geetest_challenge,
        geetest_validate: geetestObj.geetest_validate,
        geetest_seccode: geetestObj.geetest_seccode,
      });
      return success;
    } catch (e) {
      return false;
    }
  }
  async register() {
    return captcha.register(null);
  }
}

module.exports = GeeTestService;
