'use strict'

// 这个文件主要是对开发环境和生产环境的一个基本的配置

const path = require('path')
let projectInfo = ''
try {
  projectInfo = require('./multipage.project')()
} catch (e) {
  projectInfo = {
    name: 'h5'	//文件夹名称 和最后打包后文件夹的名称  /src/xxx/
  }
}
const folderVersion = require('../config/folderVersion')
let _v = folderVersion.after
module.exports = {
  // 开发环境的一个基本配置
  dev: {
    // Paths
    assetsSubDirectory: 'resource',
    assetsPublicPath: '/',
    proxyTable: {
      /*      "/member": {
       target: "http://haitian.bwtlh.com", // 替换nginx
       secure: false,
       changeOrigin: true
       },*/
    },
    // Various Dev Server settings
    host: 'tianhai.bwtlh.com',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),
    // html文件的生成的地方
    index: path.resolve(__dirname, '../dist/' + projectInfo.name + '/index.html'),

    // 编译生成的文件的目录
    assetsRoot: path.resolve(__dirname, '../dist/' + projectInfo.name),

    // 编译生成的v文件的目录
    assetsV: path.resolve(__dirname, '../dist/' + _v),
    // 编译生成的v文件的目录
    assetsResource: path.resolve(__dirname, '../dist/resource'),
    // Paths
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'resource',

    assetsPublicPath: '/',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  folderVersion: folderVersion,
  v:folderVersion.after
}
