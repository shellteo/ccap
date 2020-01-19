'use strict';
const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function authorize(ctx, next) {
    const { authorization } = ctx.headers;
    // 验证token
    // 没有authorization token信息
    if (authorization === undefined) {
      ctx.user = null;
    } else {
      // 解析request headers
      const auths = authorization.split(' ');
      // 认证协议错误
      if (auths[0] !== 'Bearer' || auths.length !== 2) {
        ctx.user = null;
      } else {
        const token = auths[1];
        try {
          ctx.user = jwt.verify(token, ctx.app.config.login.secretKey);
        } catch (err) {
          // jwt expired
          ctx.user = null;
        }
      }
    }
    await next();
  };
};
