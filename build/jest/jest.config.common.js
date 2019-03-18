const { jest: lernaAliases } = require('lerna-alias')

const setupFilesAfterEnv = [
  process.env.CI ? `${__dirname}/setup.strict.ts` : `${__dirname}/setup.common.ts`,
]

module.exports = {
  rootDir: `${__dirname}/../../`,
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  testRegex: '/test/.*-test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    ...lernaAliases(),
    'docs/(.*)$': `<rootDir>/docs/$1`,

    // Legacy aliases, they should not be used in new tests
    'src/(.*)$': `<rootDir>/packages/react/src/$1`,
    'test/(.*)$': `<rootDir>/packages/react/test/$1`,
  },
  globals: {
    'ts-jest': {
      tsConfig: `<rootDir>/build/tsconfig.test.json`,
      diagnostics: {
        ignoreCodes: 151001,
      },
    },
  },
}
