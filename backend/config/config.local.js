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
  return config;
};
