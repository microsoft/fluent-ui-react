const { coverageReporters } = require('@fluentui/internal-tooling/jest')
const { rollup: lernaAliases } = require('lerna-alias')
const path = require('path')
const fs = require('fs')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const packagePaths = lernaAliases({ sourceDirectory: false })

// Exclude packages which build with just, and other special packages
const excludedPackages = ['@fluentui/internal-tooling']
const projects = Object.keys(packagePaths).filter(
  packageName =>
    !excludedPackages.includes(packageName) &&
    !fs.existsSync(path.join(packagePaths[packageName], 'just.config.ts')),
)

module.exports = {
  coverageReporters,
  projects,
}
