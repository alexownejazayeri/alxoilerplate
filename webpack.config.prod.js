const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')
const path = require('path')

const { merge } = webpackMerge

module.exports = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'static'),
  },
})
