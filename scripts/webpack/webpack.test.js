const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [path.resolve(__dirname, '../../src/javascripts/aircallPhone.js')],
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
