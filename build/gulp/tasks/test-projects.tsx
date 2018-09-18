import * as fs from 'fs'
import { task, series } from 'gulp'
import * as rimraf from 'rimraf'
import sh from '../sh'
import * as mkdirp from 'mkdirp'

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
task('build:test:projects:cra-ts', () => {
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

  const log = (msg: string) => arg => {
    console.log()
    console.log('='.repeat(80))
    console.log('CRA TS:', msg)
    console.log('='.repeat(80))
    return arg
  }

  const logSimple = msg => {
    console.log()
    console.log('='.repeat(80))
    console.log('CRA TS:', msg)
    console.log('='.repeat(80))
  }

  const runInProjects = cmd => () => sh(`cd ${projectsPath()} && ${cmd}`)
  const runInTSApp = cmd => () => sh(`cd ${tsAppPath()} && ${cmd}`)

  let testAppDir = ''
  const runInTestApp = cmd => () => sh(`cd ${testAppDir} && ${cmd}`)

  return Promise.resolve()
    .then(() => mkdirp.sync(projectsPath()))
    .then(log('Testing temp dir scenario'))
    .then(() => sh(`mktemp -d`))
    .then(tmpDir => {
      testAppDir = tmpDir.trim()
      logSimple(testAppDir)
    })
    .then(runInTestApp(`create-react-app ${tsAppPath()} --scripts-version=react-scripts-ts`))
  // .then(() => sh(`pwd`))
  // .then((res) => log('Result is: ' + res))
})

// ----------------------------------------
// Test
// ----------------------------------------
task('test:projects:cra-ts', series('clean:test:projects:cra-ts', 'build:test:projects:cra-ts'))
