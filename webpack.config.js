const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/main.jsx',
  output: {
    publicPath: '/',
    path: './public',
    filename: '[name].[hash:5].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['latest', { modules: false }], 'react', 'stage-2'],
          plugins: [
            ['transform-runtime', {
              helpers: true,
              polyfill: true,
              regenerator: true,
              moduleName: 'babel-runtime',
            }],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:5].js',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        );
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      sourceMap: true,
    }),
  ],
};
