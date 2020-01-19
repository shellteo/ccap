'use strict';

module.exports = () => {
  return async function verify(ctx, next) {
    const { geetest_challenge, geetest_validate, geetest_seccode } = ctx.request.body;
    // const reqBody = ctx.request.body;
    const gtResult = await ctx.service.geetest.validate({
      geetest_challenge,
      geetest_validate,
      geetest_seccode,
    });
    if (!gtResult) {
      ctx.logger.info(`geetest verify failed: ${gtResult}`);
      ctx.body = ctx.msg.verifyFailed;
    } else {
      await next();
    }
  };
};
