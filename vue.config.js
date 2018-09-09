const webpack = require('webpack');

module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  }
};
