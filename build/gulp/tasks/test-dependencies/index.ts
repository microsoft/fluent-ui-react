import { task } from 'gulp'
import * as fs from 'fs'

import { argv } from 'yargs'

import { prepareWebpackConfig, runWebpack } from './utils'
import config from '../../../../config'

const { paths } = config

const prefix = (argv.prefix as string) || ''
const packageName = (argv.package as string) || 'react'

task('test:dependencies:list', cb => {
  const tempOutputFilePath = paths.base('test.js')

  const webpackConfig = prepareWebpackConfig({
    packageName,
    outputFilePath: tempOutputFilePath,
    onDependencyPackage: (packageName, packageVersion) => {
      console.log(`${prefix}${packageName}@${packageVersion}`)
    },
  })

  runWebpack(webpackConfig, () => {
    if (fs.existsSync(tempOutputFilePath)) {
      fs.unlinkSync(tempOutputFilePath)
    }

    cb()
  })
})
