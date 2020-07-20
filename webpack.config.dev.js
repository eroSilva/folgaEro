const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {
  devtool: 'source-map',
  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    host: 'localhost',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
