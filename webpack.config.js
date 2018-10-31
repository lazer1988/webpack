const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    'js/main.js': './js/main.js',
    'style.css': './css/style.scss'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "inline-source-map",
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                //sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                //sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  }
};
