import { task, parallel, series } from 'gulp'

import sh from '../sh'
import config from '../../../config'

const { paths } = config

// ----------------------------------------
// Visual
// ----------------------------------------

task('screener:runner', cb => {
  sh(`screener-runner --conf ${paths.base('screener.config.js')}`, err => {
    cb(err)

    // kill the server
    process.exit(err ? 1 : 0)
  })
})

// ----------------------------------------
// Default
// ----------------------------------------

task('screener', series('build:docs', 'serve:docs', 'screener:runner'))
