// internal-tools config should be reused
module.exports = {
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,
      diagnostics: {
        ignoreCodes: 151001,
      },
    },
  },
  setupFilesAfterEnv: ['./setup.test.ts'],
}
