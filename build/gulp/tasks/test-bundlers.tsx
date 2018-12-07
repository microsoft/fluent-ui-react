import * as debug from 'debug'
import { task } from 'gulp'
import * as fs from 'fs'
import * as path from 'path'
import * as tmp from 'tmp'

import { buildAndPackStardust, createPackageFilename, runIn } from './test-projects'

const logger = debug('bundle:rollup')
logger.enabled = true

task('test:bundlers:rollup', async () => {
  const packageFilename = createPackageFilename()

  await buildAndPackStardust(packageFilename)
  logger(`✔️Stardust UI package was prepared: ${packageFilename}`)

  const tmpDirectory = tmp.dirSync({ prefix: 'stardust-' }).name
  logger(`✔️Temporary directory was created: ${tmpDirectory}`)

  const dependencies = [
    'rollup',
    'rollup-plugin-replace',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'react',
    'react-dom',
  ].join(' ')
  await runIn(tmpDirectory)(`yarn add ${dependencies}`)
  logger(`✔️Dependencies were installed`)

  await runIn(tmpDirectory)(`yarn add ${packageFilename}`)
  logger(`✔️Stardust UI was added to dependencies`)

  fs.copyFileSync(
    path.resolve(__dirname, '..', 'scaffold', 'app.js'),
    path.resolve(tmpDirectory, 'app.js'),
  )
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'scaffold', 'rollup.config.js'),
    path.resolve(tmpDirectory, 'rollup.config.js'),
  )
  logger(`✔️Source and bundler's config were created`)

  await runIn(tmpDirectory)(`yarn rollup -c`)
  logger(`✔️Example project was successfully built: ${tmpDirectory}`)
})
