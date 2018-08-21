const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        host: 'localhost'
    },
    module: {
        rules: [
            // SASS
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
        ]
    }
});
