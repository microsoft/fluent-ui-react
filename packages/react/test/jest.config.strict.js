const commonConfig = require('./jest.config.common')

module.exports = Object.assign({}, commonConfig, {
  setupTestFrameworkScriptFile: `${__dirname}/setup.strict.ts`,
})
