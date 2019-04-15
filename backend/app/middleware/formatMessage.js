'use strict';
const message = require('../../config/message');

module.exports = options => {
  return async function format(ctx, next) {
    const { lang } = ctx.headers;
    ctx.msg = message.returnObj(lang || 'zh');
    await next();
  };
};
