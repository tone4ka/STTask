const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 4200,
    open: true,
  },
  devtool: 'inline-source-map',
});
