'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {

  // https://github.com/node-modules/parameter/blob/master/example.js
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return 'must be json string';
    }
  });
  app.validator.addRule('mypassword', (rule, value) => {
    const pattern = /^[a-zA-Z\d]{8,15}$/;
    if (!pattern.test(value)) {
      return '密码只能是字母和数字并且为8-15位';
    }
  });
  app.validator.addRule('mypasswordLen', (rule, value) => {
    if (value.length < 8 || value.length > 15) {
      return '密码8-15位';
    }
  });

};
