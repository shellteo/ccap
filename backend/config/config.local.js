/* eslint valid-jsdoc: "off" */

'use strict';

/** app info
 */
module.exports = () => {
  const config = {};
  config.sequelize = {
    dialect: 'mysql',
    hostname: '127.0.0.1',
    host: '127.0.0.1',
    port: 3306,
    database: 'ieo',
    username: 'root',
    password: 'root',
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 1,
    },
  };
  config.login = {
    username: 'admin',
    password: 'admin'
  };
  config.oss = {
    client: {
      accessKeyId: 'LTAIZolpNW0wfr3c',
      accessKeySecret: 'QiG8RBDaCEXDvyo0LcCfZAWn6DbVnO',
      bucket: 'max-well',
      endpoint: 'oss-cn-shanghai.aliyuncs.com', // oss-cn-shanghai.aliyuncs.com
      timeout: '60s',
    },
  };
  config.multipart = {
    mode: 'file',
  };
  return config;
};
