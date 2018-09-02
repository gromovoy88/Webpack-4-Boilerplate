const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
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
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: [
          "file-loader?name=/assets/img/[name].[ext]",
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            },
          }
        ]
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
      }),
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
      }),
    new WebpackMd5Hash()
  ]
};