const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  rootDir: `${__dirname}/../../../`,
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  testRegex: '/test/.*-test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: [`${__dirname}/setupTests.js`],
  moduleNameMapper: {
    ...lernaAliases(),
    'docs/(.*)$': `<rootDir>/docs/$1`,

    // Legacy aliases, they should not be used in new tests
    'src/(.*)$': `<rootDir>/packages/react/src/$1`,
    'test/(.*)$': `<rootDir>/packages/react/test/$1`,
  },
  transform: {
    '^.+\\.tsx?$': `${__dirname}/transform.js`,
  },
}
