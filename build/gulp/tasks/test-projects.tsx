import * as fs from 'fs'
import { task } from 'gulp'
import sh from '../sh'
import * as rimraf from 'rimraf'

import config from '../../../config'
import * as tmp from 'tmp'

const { paths } = config

const log = msg => {
  console.log()
  console.log('='.repeat(80))
  console.log('CRA TS:', msg)
  console.log('='.repeat(80))
}

export const createPackageFilename = () => tmp.tmpNameSync({ prefix: 'stardust-', postfix: '.tgz' })

export const runIn = path => cmd => sh(`cd ${path} && ${cmd}`)

export const buildAndPackStardust = async (packageFilename: string) => {
  await sh('yarn build:dist')
  await sh(`yarn pack --filename ${packageFilename}`)
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
  const appTSX = `import {
  Avatar,
  Button,
  Header,
  Image,
  Input,
  Popup,
  Provider,
  themes
} from '@stardust-ui/react';
import * as React from 'react';

class App extends React.Component {
  public render() {
    return (
      <Provider theme={themes.teams}>
        <div>
          <Popup trigger={<Button content="Popup" />} content="Popup content" />
          <Avatar src="//placehold.it" />
          <Button content="Click me" />
          <Header content="This is " />
          <Image src="//placehold.it" />
          <Input placeholder="Type here" />
        </div>
      </Provider>
    );
  }
}

export default App;
`
  //////// PREPARE STARDUST PACKAGE ///////
  log('STEP 0. Preparing Stardust package..')

  const packageFilename = createPackageFilename()

  await buildAndPackStardust(packageFilename)
  log(`Stardust package is published: ${packageFilename}`)

  try {
    //////// CREATE TEST REACT APP ///////
    log('STEP 1. Create test React project with TSX scripts..')

    const testAppPath = paths.withRootAt(
      await createReactApp(tmp.dirSync({ prefix: 'stardust-' }).name, 'test-app'),
    )

    const runInTestApp = runIn(testAppPath())
    log(`Test React project is successfully created: ${testAppPath()}`)

    //////// ADD STARDUST AS A DEPENDENCY ///////
    log('STEP 2. Add Stardust dependency to test project..')

    await runInTestApp(`yarn add ${packageFilename}`)
    log("Stardust is successfully added as test project's dependency.")

    //////// REFERENCE STARDUST COMPONENTS IN TEST APP's MAIN FILE ///////
    log("STEP 3. Reference Stardust components in test project's App.tsx")
    fs.writeFileSync(testAppPath('src', 'App.tsx'), appTSX)

    //////// BUILD TEST PROJECT ///////
    log('STEP 4. Build test project..')
    await runInTestApp(`yarn build`)

    log('Test project is built successfully!')
  } finally {
    fs.unlinkSync(packageFilename)
  }
})
