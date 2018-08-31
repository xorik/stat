const webpack = require('webpack');

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/toggl_api': {
        target: 'https://toggl.com/api/v8/',
        changeOrigin: true,
        pathRewrite: {'^/toggl_apis' : ''}
      }
    }
  },

  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  }
};
