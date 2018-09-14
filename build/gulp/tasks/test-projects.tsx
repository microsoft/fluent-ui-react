import * as fs from 'fs'
import { task, series } from 'gulp'
import * as rimraf from 'rimraf'
import sh from '../sh'
import config from '../../../config'

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
  const appTSX = `import * as React from 'react';
import { Avatar, Button, Header, Image, Input } from '@stardust-ui/react';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Avatar src="//placehold.it" />
        <Button content="Click me" />
        <Header content="This is " />
        <Image src="//placehold.it" />
        <Input placeholder="Type here" />
      </div>
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

  const runInProjects = cmd => () => sh(`cd ${projectsPath()} && ${cmd}`)
  const runInTSApp = cmd => () => sh(`cd ${tsAppPath()} && ${cmd}`)

  return Promise.resolve()
    .then(log('Creating React App'))
    .then(runInProjects(`create-react-app ${tsAppPath()} --scripts-version=react-scripts-ts`))

    .then(log('Updating App.tsx'))
    .then(() => {
      fs.writeFileSync(tsAppPath('src', 'App.tsx'), appTSX)
    })

    .then(log('Building Stardust'))
    .then(() => sh('yarn build:dist'))

    .then(log('Copying dist to React App'))
    .then(() => {
      fs.linkSync(paths.dist(), tsAppPath('node_modules', pkg.name))
    })

    .then(log(`Linking ${pkg.name}`))
    .then(runInTSApp(`yarn link ${pkg.name}`))

    .then(log('Installing dependencies'))
    .then(runInTSApp('yarn install'))

    .then(log('Building!'))
    .then(runInTSApp('yarn build'))
})

// ----------------------------------------
// Test
// ----------------------------------------
task('test:projects:cra-ts', series('clean:test:projects:cra-ts', 'build:test:projects:cra-ts'))
