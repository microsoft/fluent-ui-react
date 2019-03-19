const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  cwd: __dirname,
})
