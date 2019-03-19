const { jest: lernaAliases } = require('lerna-alias')

const setupFilesAfterEnv = [
  process.env.CI ? `${__dirname}/setup.strict.ts` : `${__dirname}/setup.common.ts`,
]

module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  testRegex: '/test/.*-test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: lernaAliases(),
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/../tsconfig.test.json`,
      diagnostics: {
        ignoreCodes: 151001,
      },
    },
  },
}
