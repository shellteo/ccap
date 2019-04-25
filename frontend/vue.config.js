const path = require('path')

const utils = {
  assetsPath: function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        // 生产环境下的 static 路径
        ? 'static'
        // 开发环境下的 static 路径
        : 'static'

    return path.posix.join(assetsSubDirectory, _path)
  },
  resolve: function(dir) {
    return path.join(__dirname, '..', dir)
  }
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/imports.scss";`
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options:{
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }],
        },
      ],
    }
  },
  pluginOptions: {},
  devServer: {
    host: '0.0.0.0',
    port: 8082,
  }
};
