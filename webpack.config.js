const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require('path');


const resolve = (p)=>path.resolve(__dirname, p);
const mode = process.env.NODE_ENV,
    isDev = mode ==='development';

module.exports = {
    entry: {
        home: resolve('src/views/home/index.js'),
        sort: resolve('src/algorithm/sort/index.js'),
    },
    output: {
        path: resolve( 'dist'),
        filename: "[name].[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            filename: `${isDev?'':'../'}index.html`,
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            filename: 'algorithm/sort/index.html',
            chunks: ['sort'],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    mode: mode,
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
}