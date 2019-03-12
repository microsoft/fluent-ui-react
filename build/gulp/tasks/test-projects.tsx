import * as fs from 'fs'
import { parallel, series, task } from 'gulp'
import { rollup as lernaAliases } from 'lerna-alias'
import * as path from 'path'
import sh from '../sh'
import * as rimraf from 'rimraf'

import config from '../../../config'
import * as tmp from 'tmp'

type PackedPackages = Record<string, string>

const { paths } = config

const log = (context: string) => (message: string) => {
  console.log()
  console.log('='.repeat(80))
  console.log(`${context} : ${message}`)
  console.log('='.repeat(80))
}

export const runIn = path => cmd => sh(`cd ${path} && ${cmd}`)

const addResolutionPathsForStardustPackages = async (
  testProjectDir: string,
  packedPackages: PackedPackages,
) => {
  const packageJsonPath = path.resolve(testProjectDir, 'package.json')
  const packageJson = require(packageJsonPath)

  packageJson.resolutions = packageJson.resolutions || {}
  Object.keys(packedPackages).forEach(packageName => {
    packageJson.resolutions[`**/${packageName}`] = `file:${packedPackages[packageName]}`
  })

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

const packStardustPackages = async (logger: Function): Promise<PackedPackages> => {
  // packages/react/src -> packages/react,
  // as lernaAliases append 'src'  by default
  const stardustPackages = lernaAliases({ sourceDirectory: false })

  await Promise.all(
    Object.keys(stardustPackages).map(async (packageName: string) => {
      const filename = tmp.tmpNameSync({ prefix: `stardust-`, postfix: '.tgz' })
      const directory = stardustPackages[packageName]

      await runIn(directory)(`yarn pack --filename ${filename}`)
      logger(`✔️Package "${packageName}" was packed to ${filename}`)

      stardustPackages[packageName] = filename
    }),
  )

  return stardustPackages
}

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
    await runIn(tempUtilProjectPath)(`yarn create-react-app ${appProjectPath} --typescript`)
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

  //////// CREATE TEST REACT APP ///////
  logger('STEP 1. Create test React project with TSX scripts..')

  const testAppPath = paths.withRootAt(
    await createReactApp(tmp.dirSync({ prefix: 'stardust-' }).name, 'test-app'),
  )

  const runInTestApp = runIn(testAppPath())
  logger(`Test React project is successfully created: ${testAppPath()}`)

  //////// ADD STARDUST AS A DEPENDENCY ///////
  logger('STEP 2. Add Stardust dependency to test project..')

  const packedPackages = await packStardustPackages(logger)
  await addResolutionPathsForStardustPackages(testAppPath(), packedPackages)
  await runInTestApp(`yarn add ${packedPackages['@stardust-ui/react']}`)
  logger(`✔️Stardust UI packages were added to dependencies`)

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

  const packedPackages = await packStardustPackages(logger)
  await addResolutionPathsForStardustPackages(tmpDirectory, packedPackages)
  await runIn(tmpDirectory)(`yarn add ${packedPackages['@stardust-ui/react']}`)
  logger(`✔️Stardust UI packages were added to dependencies`)

  fs.copyFileSync(scaffoldPath('app.js'), path.resolve(tmpDirectory, 'app.js'))
  fs.copyFileSync(scaffoldPath('rollup.config.js'), path.resolve(tmpDirectory, 'rollup.config.js'))
  logger(`✔️Source and bundler's config were created`)

  await runIn(tmpDirectory)(`yarn rollup -c`)
  logger(`✔️Example project was successfully built: ${tmpDirectory}`)
})

task(
  'test:projects',
  series('dll', 'bundle:all-packages', parallel('test:projects:cra-ts', 'test:projects:rollup')),
)
