const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: { chunks: 'all' },
    minimizer: [new TerserPlugin(), new OptimizeCssAssetWebpackPlugin()],
  },
});
