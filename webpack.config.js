const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
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
      ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html',
      })],
      devServer: {
        static: {
          publicPath: '/build',
          directory: path.join(__dirname, 'client'),
        },
        port: 8080,
        proxy: [
          {
            context: ['/'],
            target: 'http://localhost:3000',
          },
        ],
      },
}