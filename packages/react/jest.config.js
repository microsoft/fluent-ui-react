const commonConfig = require('@fluentui/internal-tooling/jest')

module.exports = {
  ...commonConfig,
  name: 'react',
  moduleNameMapper: require('lerna-alias').jest(),
}
