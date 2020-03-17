const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: 9528,
    hot: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
};

module.exports = merge(commonConfig, devConfig);