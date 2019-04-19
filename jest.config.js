const { coverageReporters } = require('@stardust-ui/internal-tooling/jest')
const { rollup: lernaAliases } = require('lerna-alias')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const stardustPackages = lernaAliases({ sourceDirectory: false })
const projects = Object.keys(stardustPackages).map(packageName => stardustPackages[packageName])

module.exports = {
  coverageReporters,
  projects,
}
