import * as fs from 'fs'
import { task, series } from 'gulp'
import * as rimraf from 'rimraf'
import sh from '../sh'
import * as mkdirp from 'mkdirp'
import * as parseJson from 'parse-json'

import config from '../../../config'
import { tmpdir } from 'os'

const pkg = require('../../../package.json')

const { paths } = config

const projectsPath = (...args) => paths.test('projects', ...args)
const tsAppPath = (...args) => projectsPath('cra-ts', ...args)

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:test:projects:cra-ts', cb => {
  rimraf(tsAppPath(), cb)
})

// ----------------------------------------
// Build
// ----------------------------------------

// TS Project:
//  - Create a new react test app
//  - Update the App.tsx to include some stardust imports
//  - Link our package
//  - Try and run a build
task('build:test:projects:cra-ts', async () => {
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

  const log = msg => {
    console.log()
    console.log('='.repeat(80))
    console.log('CRA TS:', msg)
    console.log('='.repeat(80))
  }

  log('STEP 0. Preparing Stardust package..')
  await sh('yarn build:dist')

  const stardustPackageFilename = (await sh(`npm pack`, true)).trim()
  log(`Stardust package is published: ${paths.base(stardustPackageFilename)}`)

  ////////

  try {
    log('STEP 1. Create test React project with TSX scripts..')
    const testAppDir = `${(await sh(`mktemp -d`, true)).trim()}/test`
    const runInTestApp = cmd => sh(`cd ${testAppDir} && ${cmd}`)

    await sh(`mkdir ${testAppDir}`)

    await runInTestApp(`yarn create react-app . --scripts-version=react-scripts-ts`)

    log(`Test React project is successfully created: ${testAppDir}`)

    ///////////

    log('STEP 2. Add Stardust dependency to test project..')
    await runInTestApp(`yarn add ${paths.base(stardustPackageFilename)}`)
    log("Stardust is successfully added as test project's dependency.")

    //////////////

    log("STEP 3. Enable 'skipLibCheck' flag for test project's TS compiler")
    const tsconfigPath = `${testAppDir}/tsconfig.json`

    const tsConfigAsJson = JSON.parse(`${fs.readFileSync(tsconfigPath)}`)
    if (!tsConfigAsJson.compilerOptions) {
      tsConfigAsJson.compilerOptions = {}
    }

    tsConfigAsJson.compilerOptions.skipLibCheck = true

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsConfigAsJson))

    ///////////////

    log("STEP 4. Reference Stardust components in test project's App.tsx")
    fs.writeFileSync(`${testAppDir}/src/App.tsx`, appTSX)

    ////////////

    log('STEP 5. Build test project..')
    await runInTestApp(`yarn build`)
    log('Test project is built successfully!')
  } finally {
    await sh(`rm ${stardustPackageFilename}`)
  }
})

// ----------------------------------------
// Test
// ----------------------------------------
task('test:projects:cra-ts', series('build:test:projects:cra-ts'))
