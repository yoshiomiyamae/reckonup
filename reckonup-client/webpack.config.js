var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: path.join('static', 'js', '[name].js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('static', 'css', '[name].css'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
}