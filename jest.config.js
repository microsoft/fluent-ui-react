const { coverageReporters } = require('@fluentui/internal-tooling/jest')
const { rollup: lernaAliases } = require('lerna-alias')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const projectPackages = lernaAliases({ sourceDirectory: false })

// Excludes the non-project packages
const excluded = ['@fluentui/playground', '@fluentui/react-theming']

const projects = Object.keys(projectPackages)
  .filter(p => !excluded.includes(p))
  .map(packageName => projectPackages[packageName])

module.exports = {
  coverageReporters,
  projects,
}
