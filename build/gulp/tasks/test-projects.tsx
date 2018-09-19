import * as fs from 'fs'
import { task, series } from 'gulp'
import sh from '../sh'

import config from '../../../config'
import * as tmp from 'tmp'

const { paths } = config

const log = msg => {
  console.log()
  console.log('='.repeat(80))
  console.log('CRA TS:', msg)
  console.log('='.repeat(80))
}

const runIn = path => cmd => sh(`cd ${path} && ${cmd}`)

const buildAndPackStardust = async (): Promise<string> => {
  await sh('yarn build:dist')

  return (await sh(`npm pack`, true)).trim()
}

const createReactApp = async (atDirectory: string) => {
  fs.mkdirSync(atDirectory)

  await runIn(atDirectory)(`yarn create react-app . --scripts-version=react-scripts-ts`)
}

const enableTsCompilerFlagSync = (tsconfigPath: string, flag: string) => {
  const tsConfigAsJson = JSON.parse(`${fs.readFileSync(tsconfigPath)}`)
  if (!tsConfigAsJson.compilerOptions) {
    tsConfigAsJson.compilerOptions = {}
  }

  tsConfigAsJson.compilerOptions[flag] = true

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsConfigAsJson))
}

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
  //////// PREPARE STARDUST PACKAGE ///////
  log('STEP 0. Preparing Stardust package..')

  const stardustPackageFilename = await buildAndPackStardust()
  log(`Stardust package is published: ${paths.base(stardustPackageFilename)}`)

  try {
    //////// CREATE TEST REACT APP ///////
    log('STEP 1. Create test React project with TSX scripts..')

    const testAppPath = paths.withRootAt(tmp.dirSync().name, 'test')
    await createReactApp(testAppPath())

    const runInTestApp = runIn(testAppPath())
    log(`Test React project is successfully created: ${testAppPath()}`)

    //////// ADD STARDUST AS A DEPENDENCY ///////
    log('STEP 2. Add Stardust dependency to test project..')

    await runInTestApp(`yarn add ${paths.base(stardustPackageFilename)}`)
    log("Stardust is successfully added as test project's dependency.")

    //////// ENABLE SKIP LIB CHECK FLAG ///////
    log("STEP 3. Enable 'skipLibCheck' flag for test project's TS compiler")

    const tsconfigPath = testAppPath('tsconfig.json')
    enableTsCompilerFlagSync(tsconfigPath, 'skipLibCheck')

    //////// REFERENCE STARDUST COMPONENTS IN TEST APP's MAIN FILE ///////
    log("STEP 4. Reference Stardust components in test project's App.tsx")
    fs.writeFileSync(testAppPath('src', 'App.tsx'), appTSX)

    //////// BUILD TEST PROJECT ///////
    log('STEP 5. Build test project..')
    await runInTestApp(`yarn build`)

    log('Test project is built successfully!')
  } finally {
    fs.unlinkSync(stardustPackageFilename)
  }
})

// ----------------------------------------
// Test
// ----------------------------------------
task('test:projects:cra-ts', series('build:test:projects:cra-ts'))
