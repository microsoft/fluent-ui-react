module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  testRegex: '/test/.*-test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupTestFrameworkScriptFile: `${__dirname}/setup.common.ts`,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    'docs/(.*)$': `${__dirname}/../docs/$1`,
    'src/(.*)$': `${__dirname}/../src/$1`,
    'test/(.*)$': `${__dirname}/../test/$1`,
  },
}
