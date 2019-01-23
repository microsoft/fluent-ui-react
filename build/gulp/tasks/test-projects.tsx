import * as fs from 'fs'
import { parallel, series, task } from 'gulp'
import * as path from 'path'
import sh from '../sh'
import * as rimraf from 'rimraf'

import config from '../../../config'
import * as tmp from 'tmp'

const { paths } = config

const log = (context: string) => (message: string) => {
  console.log()
  console.log('='.repeat(80))
  console.log(`${context} : ${message}`)
  console.log('='.repeat(80))
}

export const publishPackage = async () => {
  const filename = tmp.tmpNameSync({ prefix: 'stardust-', postfix: '.tgz' })
  await sh(`yarn pack --filename ${filename}`)

  return filename
}

export const runIn = path => cmd => sh(`cd ${path} && ${cmd}`)

const createReactApp = async (atTempDirectory: string, appName: string): Promise<string> => {
  const atDirectorySubpath = paths.withRootAt(atTempDirectory)

  // we need this temp sibling project to install create-react-app util without polluting
  // global state, as well as the scope of test project
  const tempUtilProjectPath = atDirectorySubpath('util')
  const appProjectPath = atDirectorySubpath(appName)

  fs.mkdirSync(tempUtilProjectPath)

  try {
    // restoring bits of create-react-app inside util project
    await runIn(tempUtilProjectPath)('yarn add create-react-app')

    // create test project with util's create-react-app
    fs.mkdirSync(appProjectPath)
    await runIn(tempUtilProjectPath)(
      `yarn create-react-app ${appProjectPath} --scripts-version=react-scripts-ts`,
    )
  } finally {
    // remove temp util directory
    rimraf.sync(tempUtilProjectPath)
  }

  return appProjectPath
}

// Tests the following scenario
//  - Create a new react test app
//  - Add Stardust as a app's dependency
//  - Update the App.tsx to include some stardust imports
//  - Try and run a build
task('test:projects:cra-ts', async () => {
  const logger = log('test:projects:cra-ts')
  const scaffoldPath = paths.base.bind(null, 'build/gulp/tasks/test-projects/cra')

  const packageFilename = await publishPackage()
  logger(`✔️Package was published: ${packageFilename}`)

  //////// CREATE TEST REACT APP ///////
  logger('STEP 1. Create test React project with TSX scripts..')

  const testAppPath = paths.withRootAt(
    await createReactApp(tmp.dirSync({ prefix: 'stardust-' }).name, 'test-app'),
  )

  const runInTestApp = runIn(testAppPath())
  logger(`Test React project is successfully created: ${testAppPath()}`)

  //////// ADD STARDUST AS A DEPENDENCY ///////
  logger('STEP 2. Add Stardust dependency to test project..')

  await runInTestApp(`yarn add ${packageFilename}`)
  logger("Stardust is successfully added as test project's dependency.")

  //////// REFERENCE STARDUST COMPONENTS IN TEST APP's MAIN FILE ///////
  logger("STEP 3. Reference Stardust components in test project's App.tsx")
  fs.copyFileSync(scaffoldPath('App.tsx'), testAppPath('src', 'App.tsx'))

  //////// BUILD TEST PROJECT ///////
  logger('STEP 4. Build test project..')
  await runInTestApp(`yarn build`)

  logger('Test project is built successfully!')
})

task('test:projects:rollup', async () => {
  const logger = log('test:projects:rollup')

  const scaffoldPath = paths.base.bind(null, 'build/gulp/tasks/test-projects/rollup')
  const tmpDirectory = tmp.dirSync({ prefix: 'stardust-' }).name

  logger(`✔️Temporary directory was created: ${tmpDirectory}`)

  const packageFilename = await publishPackage()
  logger(`✔️Package was published: ${packageFilename}`)

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

  fs.copyFileSync(scaffoldPath('app.js'), path.resolve(tmpDirectory, 'app.js'))
  fs.copyFileSync(scaffoldPath('rollup.config.js'), path.resolve(tmpDirectory, 'rollup.config.js'))
  logger(`✔️Source and bundler's config were created`)

  await runIn(tmpDirectory)(`yarn rollup -c`)
  logger(`✔️Example project was successfully built: ${tmpDirectory}`)
})

task(
  'test:projects',
  series('dll', 'build:dist', parallel('test:projects:cra-ts', 'test:projects:rollup')),
)
