var webpack = require('webpack');
var config = require('./conf.base');
var configData = require('./conf.const');

config.plugins = config.plugins || [];
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}));
config.plugins.push(new webpack.LoaderOptionsPlugin({
  minimize: true
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}));

module.exports = config;