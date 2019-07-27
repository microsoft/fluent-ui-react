const commonConfig = require('@stardust-ui/internal-tooling/jest')

module.exports = {
  ...commonConfig,
  name: 'style',
  moduleNameMapper: {
    ...require('lerna-alias').jest(),
  },
}
