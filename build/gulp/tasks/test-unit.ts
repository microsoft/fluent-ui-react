import { parallel, series, task } from 'gulp'

import sh from '../sh'

// ----------------------------------------
// Jest
// ----------------------------------------
const jest = ({ watch = false } = {}) => cb => {
  process.env.NODE_ENV = 'test'

  if (watch) {
    // in watch mode jest never exits
    // let the gulp task complete to prevent blocking subsequent tasks
    return sh('jest --coverage --watchAll')
  }

  return sh('jest --coverage --runInBand')
}

task('test:jest:pre', () => sh('yarn satisfied'))

task(
  'test:jest:setup',
  series('test:jest:pre', parallel('build:docs:docgen', 'build:docs:component-menu-behaviors')),
)

task('test:jest', jest())
task('test:jest:watch', jest({ watch: true }))

// ----------------------------------------
// Tests
// ----------------------------------------

task('test', series('test:jest:setup', 'test:jest'))
task('test:watch', series('test:jest:setup', parallel('test:jest:watch', 'watch:docs')))
