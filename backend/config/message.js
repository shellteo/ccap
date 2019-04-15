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
      nameUsed: { code: 2000001, message: '用户名已被使用' },
      userExists: { code: 2000002, message: '用户已存在' },
      userNotExist: { code: 2000003, message: '用户不存在' },
      girlNotExist: { code: 2000004, message: 'girl不存在' },
      APNotEnough: { code: 2000005, message: '次数已用完' },
      createFailed: { code: 2000006, message: '创建失败' },
      likeFailed: { code: 2000007, message: '点赞失败' },
      alreadyLiked: { code: 2000008, message: '已经点过赞了' },
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
