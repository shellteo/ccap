'use strict';

// 错误码统一编码，提示信息多语言
module.exports = {
  returnObj(lang) {

    const en = {
      lang: 'en',
    };

    const zh = {
      lang: 'zh',
      success: { code: 0, message: 'success' },
      mailHadUsed: { code: 2000001, message: '邮箱已被使用' },
      psdError: { code: 2000002, message: '密码错误' },
      codeError: { code: 2000002, message: '验证码错误' },
      userExists: { code: 2000002, message: '用户已存在' },
      userNotExist: { code: 2000003, message: '用户不存在' },
      ieoNotExist: { code: 2000004, message: 'IEO不存在' },
      APNotEnough: { code: 2000005, message: '次数已用完' },
      createFailed: { code: 2000006, message: '创建失败' },
      mailSendFailed: { code: 2000006, message: '邮件发送失败' },
    };
    let message;

    switch (lang) {
      case 'en':
        message = en;
        break;
      case 'zh':
        message = zh;
        break;
      default:
        message = zh;
        break;
    }

    return message;
  },

};
