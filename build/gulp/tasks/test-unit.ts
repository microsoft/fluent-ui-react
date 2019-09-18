import { parallel, series, task } from 'gulp'
import yargs from 'yargs'

import sh from '../sh'
import jest, { JestPluginConfig } from '../plugins/gulp-jest'

const argv = yargs
  .option('runInBand', {})
  .option('maxWorkers', {})
  .option('detectLeaks', {})
  .option('testNamePattern', { alias: 't' })
  .option('testFilePattern', { alias: 'F' }).argv

const jestConfigFromArgv: Partial<JestPluginConfig> = {
  runInBand: argv.runInBand as boolean,
  maxWorkers: argv.maxWorkers as number,
  detectLeaks: argv.detectLeaks as boolean,
  testNamePattern: argv.testNamePattern as string,
  testFilePattern: argv.testFilePattern as string,
}

task('test:jest:pre', () => sh('yarn satisfied'))

task(
  'test:jest:setup',
  series(
    'test:jest:pre',
    parallel('build:docs:component-info', 'build:docs:component-menu-behaviors'),
  ),
)

task(
  'test:jest',
  jest({
    config: './jest.config.js',
    coverage: true,
    ...jestConfigFromArgv,
  }),
)

task(
  'test:jest:watch',
  jest({
    config: './jest.config.js',
    watchAll: true,
    ...jestConfigFromArgv,
  }),
)

// ----------------------------------------
// Tests
// ----------------------------------------

task('test', series('test:jest:setup', 'test:jest'))
task('test:watch', series('test:jest:setup', parallel('test:jest:watch', 'watch:docs')))
