var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: { loader: 'babel-loader' } },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      { test: /\.(png|jpg|gif)$/, use: [ { loader: 'file-loader', options: {} } ]},
      { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]},
      { test: /\.svg$/, loader: 'svg-sprite-loader'}
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
        '/api/': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
  },
  resolveLoader: {
   moduleExtensions: ["-loader"]
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};
