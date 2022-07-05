const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// const publicFolder = path.join(__dirname, "public");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src/scripts/index.js"),
    form: path.resolve(__dirname, "src/scripts/form.js"),
    result: path.resolve(__dirname, "src/scripts/result.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },

    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "main page",
      filename: "index.html",
      template: "src/html/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "form",
      filename: "form.html",
      template: "src/html/pages/form.html",
      chunks: ["form"],
    }),
    new HtmlWebpackPlugin({
      title: "result",
      filename: "result.html",
      template: "src/html/pages/result.html",
      chunks: ["result"],
    }),

    // new CopyPlugin({
    //   patterns: [
    //     {
    //       // from: publicFolder,
    //     },
    //   ],
    // }),
  ],
};
