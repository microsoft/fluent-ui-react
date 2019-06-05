const commonConfig = require('@stardust-ui/internal-tooling/jest')

module.exports = {
  ...commonConfig,
  moduleNameMapper: {
    ...require('lerna-alias').jest(),
  },
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,
    },
  },
  setupFilesAfterEnv: ['./setup.test.ts'],
}
