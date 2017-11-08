var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./conf.base');
var configData = require('./conf.const');

config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new HtmlWebpackPlugin({
  inject: false,
  filename: 'index.html',
  template: configData.entryPath + '/index.html',
}));
config.plugins.push(new webpack.LoaderOptionsPlugin({
  debug: true
}));

config.devServer = {
  host: '0.0.0.0',
  port: configData.devServerPort,
  contentBase: configData.outputPath,
  compress: true,
  hot: true,
  inline: true,
  before: function(app){
    app.disable('x-powered-by');
  },
  quiet: false,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false
  },
};

config.devtool = '#cheap-module-eval-source-map';

module.exports = config;