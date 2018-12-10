import { parallel, series, task } from 'gulp'
import { argv } from 'yargs'

import sh from '../sh'

// ----------------------------------------
// Jest
// ----------------------------------------
const jest = ({ watch = false } = {}) => cb => {
  process.env.NODE_ENV = 'test'

  const jestConfigFileName = `jest.config.${argv.strict ? 'strict' : 'common'}.js`

  // in watch mode jest never exits
  // let the gulp task complete to prevent blocking subsequent tasks
  const command = [
    `jest --config ./test/${jestConfigFileName} --coverage`,
    watch && '--watchAll',
    argv.runInBand && '--runInBand',
    argv.maxWorkers && `--maxWorkers=${argv.maxWorkers}`,
  ]
    .filter(Boolean)
    .join(' ')

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
