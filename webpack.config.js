const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/*const pages = fs
    .readdirSync(path.resolve(__dirname, 'src'))
    .filter(fileName => fileName.endsWith('.html'));*/

module.exports = {
    entry: {main: "./src/js/index.js"},
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|ico|webp)$/,
                exclude: /icons/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|svg)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.[hash].min.css",
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: "index.html",
            favicon: "./src/favicon.ico"
        }),
        new HtmlWebpackPlugin({
            template: 'src/news.html',
            filename: "news.html",
            favicon: "./src/favicon.ico"
        }),
        new HtmlWebpackPlugin({
            template: 'src/gallery.html',
            filename: "gallery.html",
            favicon: "./src/favicon.ico"
        }),
        new HtmlWebpackPlugin({
            template: 'src/info.html',
            filename: "info.html",
            favicon: "./src/favicon.ico"
        }),
        /*...pages.map((page) => new HtmlWebpackPlugin({
            tamplate: page,
            filename: page,
            favicon: './src/favicon.ico',
            inject: true
        })),*/
        new SVGSpritemapPlugin("src/img/icons/*.svg", {
            output: {
                filename: "img/spritemap.svg"
            }
        }),
    ]
};