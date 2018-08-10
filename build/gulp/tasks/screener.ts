import { task, parallel, series } from 'gulp'

import sh from '../sh'
import config from '../../../config'

const { paths } = config

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  sh(`screener-runner --conf ${paths.base('screener.config.js')}`, err => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      process.exit(0)
    }
  })
})

// ----------------------------------------
// Default
// ----------------------------------------

task('screener', series('clean:docs', 'build:docs', 'serve:docs', 'screener:runner'))
