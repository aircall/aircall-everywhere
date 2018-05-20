const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const extractStyles = new ExtractTextPlugin('main.css');

module.exports = {
  entry: [path.resolve(__dirname, '../../src/javascripts/index.js')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../../src')],
        enforce: 'pre',

        loader: 'babel-loader',

        options: {
          plugins: ['babel-plugin-rewire']
        }
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../../src')],
        enforce: 'pre',

        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true
        }
      }
    ]
  },

  mode: 'development',

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../../src/javascripts')],
    extensions: ['.js']
  },

  plugins: []
};
