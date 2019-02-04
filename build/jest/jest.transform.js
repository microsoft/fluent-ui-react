const babelJest = require('babel-jest')
const { rollup: lernaAliases } = require('lerna-alias')
const _ = require('lodash')

const packagePaths = _.values(lernaAliases({ sourceDirectory: false }))

const getPackageCwd = findPath => packagePaths.find(packagePath => packagePath.startsWith(findPath))

const transformer = babelJest.createTransformer({
  cwd: packagePaths[0],
})

module.exports = {
  ...transformer,
  getCacheKey(fileData, filename, configString, { config, instrument, rootDir }) {
    const packageCwd = getPackageCwd(filename)

    return transformer.getCacheKey(fileData, filename, configString, {
      config: { ...config, cwd: packageCwd },
      instrument,
      rootDir,
    })
  },
  process: (src, filename, config, transformOptions) => {
    const packageCwd = getPackageCwd(filename)

    return transformer.process(
      src,
      filename,
      {
        ...config,
        cwd: packageCwd,
      },
      transformOptions,
    )
  },
}
