const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], ["@babel/preset-react"]],
          },
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html',
    }),
  ],
  devServer: {
    static: {
      publicPath: '/',
      directory: path.join(__dirname, 'client'),
    },
    port: 8080,
    proxy: [
      {
        context: ['/api', '/admin'],
        target: 'http://localhost:3000',
        logLevel: 'debug',
      },
    ],
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
}