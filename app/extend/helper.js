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
  removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    let urlparts = url.split('?');
    if (urlparts.length >= 2) {

      let prefix = encodeURIComponent(parameter) + '=';
      let pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0;) {
        //idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
  },
  _2key(key) {
    return key.trim().toLowerCase().split(' ').join('_')
  },
  _2value(v) {
    v = v.trim();
    if (v === 'n/a' || v === '') {
      return null
    }
    return v
  },
  fromUnixTimestamp(v) {
    return v * 1000
  },
  toUnixTimestamp(v) {
    let result = new Date(v);
    return Math.round(result / 1000)
  },
};
