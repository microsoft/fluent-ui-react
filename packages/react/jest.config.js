const commonConfig = require('../../build/jest/jest.config.common')

module.exports = {
  ...commonConfig,
  name: 'react',
  moduleNameMapper: {
    ...commonConfig.moduleNameMapper,
    'docs/(.*)$': `<rootDir>/../../docs/$1`,

    // Legacy aliases, they should not be used in new tests
    'src/(.*)$': `<rootDir>/src/$1`,
    'test/(.*)$': `<rootDir>/test/$1`,
  },
}
