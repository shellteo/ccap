'use strict';
const crypto = require('crypto');

module.exports = {
  nowUnixTime() {
    return Math.round(new Date().getTime() / 1000);
  },
  randomNumber(len) {
    return Math.random().toString().slice(-len);
  },
  md5(data) {
    const md5 = crypto.createHash('md5');
    return md5.update(data).digest('hex');
  },
  isNull(v) {
    return v === '' || v === null || v === undefined || JSON.stringify(v) === '{}' || JSON.stringify(v) === '[]';
  },
};
