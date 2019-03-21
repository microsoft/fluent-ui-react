const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: lernaAliases(),
  setupFilesAfterEnv,
  testRegex: '/test/.*-test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': `${__dirname}/transform.js`,
  },
}
