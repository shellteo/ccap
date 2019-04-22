//const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/imports.scss";`
      },
    },
  },
  pluginOptions: {},
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  }
};

