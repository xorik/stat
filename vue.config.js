const webpack = require('webpack');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  }
};
