const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Load env variables
require('dotenv').config()

// Detect what npm script was called - and branch based on that
const TARGET = process.env.npm_lifecycle_event
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: {
    // Seamlessly provide full es2015 env
    app: ['babel-polyfill', 'whatwg-fetch', './src/index.ts']
  },
  devtool: 'source-map',
  debug: true,
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    root: [__dirname, PATHS.src],
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {test: /\.svg$/, loader: 'svg-inline'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')},
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015'],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          },{
            loader: 'ts-loader'
          }
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      title: 'Typed React Starter Kit',
      template: 'src/index.ejs',
      inject: 'body'
    }),
    new webpack.IgnorePlugin(/-spec.js/)
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        // This has effect on the react lib size.
        'process.env.NODE_ENV': JSON.stringify("production")
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}
