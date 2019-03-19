const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  configFile: require('path').resolve(__dirname, 'babel.config.js'),
})
