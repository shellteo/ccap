// const fs = require('fs')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const prettydata = require('pretty-data')
const path = require('path')

const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://hub.storyscript.io'
const paths = ['/', '/services', '/functions', '/apps']

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: {
    plugins: [
      new SitemapPlugin(url, paths, {
        changeFreq: 'weekly',
        skipGzip: true,
        formatter: xml => prettydata.pd.xml(xml)
      })
    ]
  },
  devServer: {
    disableHostCheck: true
  }
}
