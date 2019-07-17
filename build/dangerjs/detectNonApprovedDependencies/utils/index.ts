import * as path from 'path'
import { webpack as lernaAliases } from 'lerna-alias'
import { LicenseWebpackPlugin } from 'license-webpack-plugin'
import * as webpack from 'webpack'

import config from '../../../../config'

export { default as isApproved } from './isApproved'

const { paths } = config

const STARDUST_INDEX_PATH = paths.packageSrc('react', 'index')

type WebpackOptions = {
  outputFilePath: string
  onDependencyPackage: (packageName: string, packageVersion) => void
}

export const prepareWebpackConfig = (options: WebpackOptions) => {
  const { outputFilePath, onDependencyPackage } = options

  return {
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: {
      app: STARDUST_INDEX_PATH,
    },
    output: {
      path: path.dirname(outputFilePath),
      filename: path.basename(outputFilePath),
    },
    module: {
      noParse: [/anchor-js/],
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new LicenseWebpackPlugin({
        stats: {
          warnings: false,
          errors: false,
        },
        renderLicenses: modules => {
          modules.forEach(module => {
            const packageName = module.packageJson.name
            const packageVersion = module.packageJson.version

            onDependencyPackage(packageName, packageVersion)

            return modules[0].packageJson.name
          })

          return null
        },
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        ...lernaAliases(),
        src: paths.packageSrc('react'),
        docs: paths.base('docs'),
      },
    },
  }
}

export const runWebpack = (config: any, done: (err: any, stats: any) => void) => {
  webpack(config).run(done)
}
