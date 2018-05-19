const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const extractStyles = new ExtractTextPlugin('main.[md5:contenthash:hex:20].css');

module.exports = () => {
  let _mode = null;
  let _output = null;

  const _entry = ['../../src/javascripts/index.js'];

  const _devtool = 'source-map';

  const _target = 'web';

  const _context = __dirname;

  const _resolve = {
    modules: ['node_modules', path.resolve(__dirname, '../../src/javascripts')],
    extensions: ['.js']
  };

  const _plugins = [];

  const _module = {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../../src')],
        enforce: 'pre',
        enforce: 'post',

        loader: 'babel-loader',

        options: {
          presets: ['es2015']
        }
      }
    ]
  };

  _output = {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'main.[hash].js'
  };

  _mode = 'production';

  return {
    entry: _entry,
    output: _output,
    module: _module,
    resolve: _resolve,
    devtool: _devtool,
    plugins: _plugins,
    mode: _mode,
    target: _target,
    context: _context
  };
};
