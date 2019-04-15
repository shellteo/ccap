'use strict';
const jwt = require('jsonwebtoken');

module.exports = options => {
  return async function authorize(ctx, next) {
    const { authorization } = ctx.headers;
    // 验证token
    // 没有authorization token信息
    if (authorization === undefined) {
      ctx.throw(401, 'Access denied.');
    }
    // 解析request headers
    const auths = authorization.split(' ');
    // 认证协议错误
    if (auths[0] !== 'Bearer' || auths.length !== 2) {
      ctx.throw(401, 'The authorization is error.');
    }
    const token = auths[1];
    try {
      const user = jwt.verify(token, ctx.app.config.login.secretKey);
      ctx.user = user;
    } catch (err) {
      // jwt expired
      ctx.throw(401, 'The token is error.');
    }
    /* if (user.address !== address) {
            ctx.throw(401, 'The address is error.');
        }*/
    await next();
  };
};
