'use strict';


const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
    const isDevelop = !(env && env.prod);
    return {
        mode: isDevelop ? 'development' : 'production',
        entry: {
            app: ['./src/index.tsx'],
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },

        module: {
            rules: [
                { 
                    test: /\.tsx?$/, 
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    loader: "ts-loader" 
                },
                {
                    test: /\.js?$/,
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                      'style-loader',
                      { loader: 'css-loader', options: { importLoaders: 1 } },
                      'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [{
                      loader: 'style-loader'
                    }, {
                      loader: 'css-loader'
                    }, {
                      loader: 'less-loader'
                    }]
                  }
            ]
        }, 
        plugins: [
            new CopyWebpackPlugin([
                {from: 'static'}
            ]),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ],
        devServer: {
            port: 3000,
            inline: true,
            // hot: true,
            contentBase: path.resolve(__dirname, 'dist')
        }
    };
};