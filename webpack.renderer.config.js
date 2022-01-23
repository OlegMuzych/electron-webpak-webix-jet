const rules = require('./webpack.rules');

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
  module: {
    rules,
  },
};
