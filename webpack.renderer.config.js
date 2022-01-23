const rules = require('./webpack.rules');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
let pack = require("./package.json");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      "presets": [
        ["@babel/preset-env", {
          // "useBuiltIns": "entry"
        }]
      ]
    }
  }
});

module.exports = {
  // Put your normal webpack config below here
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.DefinePlugin({
      VERSION: `"${pack.version}"`,
      APPNAME: `"${pack.name}"`,
      PRODUCTION: false,//production,
      BUILD_AS_MODULE: false,//(asmodule || standalone)
    })
  ],

  module: {
    rules,
  },

  resolve: {
    extensions: [".js"],
    modules: ["./src/jet-app", "node_modules"],
    alias: {
      "jet-views": path.resolve(__dirname, "src/jet-app/views"),
      "jet-locales": path.resolve(__dirname, "src/jet-app/locales")
    }
  },
};
