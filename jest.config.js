const { rollup: lernaAliases } = require('lerna-alias')
const commonConfig = require('./build/jest/jest.config.common')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const stardustPackages = lernaAliases({ sourceDirectory: false })
const projects = Object.keys(stardustPackages).map(packageName => stardustPackages[packageName])

module.exports = {
  coverageReporters: commonConfig.coverageReporters,
  projects,
}
