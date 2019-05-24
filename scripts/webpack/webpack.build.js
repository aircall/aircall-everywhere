const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  let _mode = null;
  let _output = null;

  const _entry = [path.join(__dirname, '../../index.js')];

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
          presets: ['@babel/preset-env']
        }
      }
    ]
  };

  _output = {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'index.js',
    library: 'aircall-everywhere',
    libraryTarget: 'commonjs2'
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
