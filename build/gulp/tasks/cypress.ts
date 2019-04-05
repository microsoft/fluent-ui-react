import { task, series } from 'gulp'

import sh from '../sh'

// ----------------------------------------
// E2E
// ----------------------------------------

task('cypress:runner', cb => {
  sh(`cypress run --reporter junit --reporter-options "mochaFile=results/my-test-output.xml"`)
    .then(() => {
      cb()
      process.exit(0)
    })
    .catch(err => {
      cb(err)
      process.exit(1)
    })
})

// ----------------------------------------
// Default
// ----------------------------------------

task('cypress', series('dll', 'build:docs', 'serve:docs', 'cypress:runner'))
