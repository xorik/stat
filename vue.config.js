const webpack = require('webpack');

module.exports = {
  pwa: {
    name: 'Stat',
    themeColor: '#555555',
    assetsVersion: '0.0.3'
  },

  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  }
};
