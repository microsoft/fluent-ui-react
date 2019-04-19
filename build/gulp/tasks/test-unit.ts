import { parallel, series, task } from 'gulp'
import * as yargs from 'yargs'

import sh from '../sh'

const argv = yargs
  .option('runInBand', {})
  .option('maxWorkers', {})
  .option('detectLeaks', {})
  .option('testNamePattern', { alias: 't' })
  .option('testFilePattern', { alias: 'F' }).argv

// ----------------------------------------
// Jest
// ----------------------------------------
const jest = ({ watch = false } = {}) => cb => {
  process.env.NODE_ENV = 'test'

  // in watch mode jest never exits
  // let the gulp task complete to prevent blocking subsequent tasks
  const command = [
    `jest --config ./jest.config.js --coverage`,
    watch && '--watchAll',
    argv.runInBand && '--runInBand',
    argv.maxWorkers && `--maxWorkers=${argv.maxWorkers}`,
    argv.detectLeaks && '--detectLeaks',
    argv.testNamePattern && `--testNamePattern="${argv.testNamePattern}"`,
    argv.testFilePattern && `${argv.testFilePattern}`, // !!! THIS ITEM MUST GO LAST IN THE ARRAY !!!
  ]
    .filter(Boolean)
    .join(' ')

  console.log(command)

  return sh(command)
}

task('test:jest:pre', () => sh('yarn satisfied'))

task(
  'test:jest:setup',
  series(
    'test:jest:pre',
    parallel('build:docs:component-info', 'build:docs:component-menu-behaviors'),
  ),
)

task('test:jest', jest())
task('test:jest:watch', jest({ watch: true }))

// ----------------------------------------
// Tests
// ----------------------------------------

task('test', series('test:jest:setup', 'test:jest'))
task('test:watch', series('test:jest:setup', parallel('test:jest:watch', 'watch:docs')))
