const { coverageReporters } = require('@fluentui/internal-tooling/jest')
const { rollup: lernaAliases } = require('lerna-alias')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const stardustPackages = lernaAliases({ sourceDirectory: false })

// Excludes the non-stardust packages
const excluded = ['@fluentui/playground', '@fluentui/react-theming']

const projects = Object.keys(stardustPackages)
  .filter(p => !excluded.includes(p))
  .map(packageName => stardustPackages[packageName])

module.exports = {
  coverageReporters,
  projects,
}
