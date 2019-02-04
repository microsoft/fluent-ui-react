const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  rootDir: `${__dirname}/../../`,
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  testRegex: '/test/.*-test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupTestFrameworkScriptFile: `${__dirname}/setup.common.ts`,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    ...lernaAliases(),

    // Legacy aliases, they should not be used in new tests
    'docs/(.*)$': `<rootDir>/docs/$1`,
    'src/(.*)$': `<rootDir>/packages/react/src/$1`,
    'test/(.*)$': `<rootDir>/packages/react/test/$1`,
  },
  globals: {
    'ts-jest': {
      tsConfig: `./build/tsconfig.test.json`,
    },
  },
}
