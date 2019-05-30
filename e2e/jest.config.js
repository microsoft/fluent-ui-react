const commonConfig = require('@stardust-ui/internal-tooling/jest')

module.exports = {
  ...commonConfig,
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  moduleNameMapper: {
    ...require('lerna-alias').jest(),
  },
  setupFilesAfterEnv: ['./setup.test.js'],
}
