import * as fs from 'fs'

import { prepareWebpackConfig, runWebpack, isApproved } from './utils'
import config from '../../../config'

const { paths } = config

const detectNonApprovedDependencies = dangerJS => {
  const { fail } = dangerJS

  return new Promise(resolve => {
    const TEMP_OUTPUT_FILE_PATH = paths.base('test.js')

    const nonApprovedPackages: string[] = []

    const webpackConfig = prepareWebpackConfig({
      outputFilePath: TEMP_OUTPUT_FILE_PATH,
      onDependencyPackage: (packageName, packageVersion) => {
        if (!isApproved(packageName, packageVersion)) {
          nonApprovedPackages.push(`${packageName}@${packageVersion}`)
        }
      },
    })

    // this is where async part starts
    runWebpack(webpackConfig, () => {
      if (nonApprovedPackages.length) {
        fail(`The following packages lack approval: ${nonApprovedPackages.join(', ')}`)
      }

      // remove output file produced by webpack
      if (fs.existsSync(TEMP_OUTPUT_FILE_PATH)) {
        fs.unlinkSync(TEMP_OUTPUT_FILE_PATH)
      }
      resolve()
    })
  })
}

export default detectNonApprovedDependencies
