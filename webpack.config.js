const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: ["./src/index.html", "./src/styles/main.scss"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          "html-loader",
          {
            loader: "posthtml-loader",
            options: {
              plugins: [require("posthtml-include")({ root: "src" })],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackInlineSVGPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: "./dist",
    hot: true, // for auto refresh
    port: 3010,
  },
};
