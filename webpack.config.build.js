const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {
  devtool: false,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      // SASS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
})
