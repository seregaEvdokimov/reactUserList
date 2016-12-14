/**
 * Created by s.evdokimov on 06.12.2016.
 */

var path = require("path");
var webpack = require("webpack");
var devServer = require("webpack-dev-server");
var extractTextPlugin = require("extract-text-webpack-plugin");

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: {
        main: SRC_DIR + '/App.jsx'
    },
    output: {
        path: DIST_DIR,
        filename: "[name].js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.less/,
                exclude: /node_modules/,
                loader: 'file?name=style.css!less'
                // loader: extractTextPlugin.extract('css!less')
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)/,
                exclude: /node_modules/,
                loader: "file?name=[path][name].[ext]"
            }
        ]
    },

    devtool: 'source-map',

    // plugins: [
    //     new extractTextPlugin('style.css')
    // ],

    // watch: true,

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: DIST_DIR
    }
};

module.exports = config;