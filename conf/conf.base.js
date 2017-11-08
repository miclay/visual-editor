var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var configData = require('./conf.const');

var config = {};

config.entry = {
  'index': [configData.entryPath + '/index.js']
};

config.module = {};
config.module.loaders = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract(['css-loader']),
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract(['css-loader', 'less-loader']),
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  }
];

config.output = {
  path: configData.outputPath,
  filename: '[name].js',
};

config.resolve = {
  extensions: ['.js'],
  alias: {
    'src': path.join(__dirname, '../src'),
    'styles': path.join(__dirname, '../src/styles'),
    'scripts': path.join(__dirname, '../src/scripts'),
  }
};

config.plugins = [
  new ExtractTextPlugin('[name].css'),
];

module.exports = config;