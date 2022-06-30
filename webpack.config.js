const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src/scripts/index.js"),
    form: path.resolve(__dirname, "src/scripts/form.js"),
    result: path.resolve(__dirname, "src/scripts/result.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
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
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
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
      template: "src/pages/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "form",
      filename: "form.html",
      template: "src/pages/form.html",
    }),
    new HtmlWebpackPlugin({
      title: "result",
      filename: "result.html",
      template: "src/pages/result.html",
    }),
    new MiniCssExtractPlugin({
      filename: "dist/[name].css",
      // chunkFilename: "[name].css"
    }),
  ],
};
