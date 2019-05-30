import { task, series } from 'gulp'
import * as yargs from 'yargs'
import config from '../../../config'

import jest from '../plugins/gulp-jest'
import serve, { forceClose } from '../serve'
import { Server } from 'http'

const { paths } = config

const argv = yargs
  .option('skipBuild', {})
  .option('testNamePattern', { alias: 't' })
  .option('testFilePattern', { alias: 'F' }).argv

let server: Server
task('test:e2e:serve', async () => {
  server = await serve(paths.docsDist(), config.server_host, config.e2e_port)
})

task('test:e2e:serve:stop', () => forceClose(server))

task(
  'test:e2e:run',
  jest({
    config: paths.e2e('jest.config.js'),
    runInBand: true,
    rootDir: paths.e2e(),
    testNamePattern: argv.testNamePattern as string,
    testFilePattern: argv.testFilePattern as string,
  }),
)

task(
  'test:e2e',
  series(
    argv.skipBuild ? cb => cb() : 'build:docs',
    'test:e2e:serve',
    'test:e2e:run',
    'test:e2e:serve:stop',
  ),
)
