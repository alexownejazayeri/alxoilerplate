const path = require('path')
const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')

const { merge } = webpackMerge

module.exports = merge(config, {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },

  output: {
    path: path.resolve(__dirname, 'static'),
  },
})
