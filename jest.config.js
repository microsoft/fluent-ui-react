const { rollup: lernaAlises } = require('lerna-alias')

// packages/react/src -> packages/react,
// as lernaAliases append 'src' by default
const stardustPackages = lernaAlises({ sourceDirectory: false })
const projects = Object.keys(stardustPackages).map(packageName => stardustPackages[packageName])

module.exports = {
  projects,
}
