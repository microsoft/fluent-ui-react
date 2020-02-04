const { coverageReporters } = require('@fluentui/internal-tooling/jest')
const { rollup: lernaAliases } = require('lerna-alias')
const path = require('path')
const fs = require('fs')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const packagePaths = lernaAliases({ sourceDirectory: false })

// Exclude packages which build with just, and other special packages
const excludedPackages = [
  '@fluentui/docs',
  '@fluentui/e2e',
  '@fluentui/internal-tooling',
  '@fluentui/perf',
]
const projects = Object.keys(packagePaths)
  .filter(
    packageName =>
      !excludedPackages.includes(packageName) &&
      !fs.existsSync(path.join(packagePaths[packageName], 'just.config.ts')),
  )
  .map(packageName => packagePaths[packageName])

module.exports = {
  coverageReporters,
  projects,
}
