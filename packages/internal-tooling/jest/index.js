const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: lernaAliases(),
  setupFilesAfterEnv: [`${__dirname}/setupTests.js`],
  testRegex: '/test/.*-test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
}
