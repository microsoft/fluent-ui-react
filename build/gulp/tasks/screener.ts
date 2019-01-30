import { task, series } from 'gulp'
import sh from '../sh'
import config from '../../../config'

const { paths } = config

// ----------------------------------------
// Visual
// ----------------------------------------

const withHeader = (header: string, content: string): string =>
  ['='.repeat(80), header, '='.repeat(80), content].join('\n')

const screenerAwaiters: Promise<string>[] = []

const startScreenerProcess = (silent: boolean = false): Promise<string> => {
  return sh(`screener-runner --conf ${paths.base('screener.config.js')}`, silent)
}

const waitAndKillProcess = (waitScreener: Promise<any>, cb) => {
  waitScreener
    .then(() => {
      cb()
      process.exit(0)
    })
    .catch(() => {
      cb()
      process.exit(1)
    })
}

task('screener:runner', cb => {
  const waitScreener = startScreenerProcess()

  // kill the server when done
  waitAndKillProcess(waitScreener, cb)
})

task('screener:runner:async', cb => {
  const waitScreener = startScreenerProcess(true)
  screenerAwaiters.push(waitScreener)

  cb()
})

// ----------------------------------------
// Prepare environment
// ----------------------------------------
task('screener:prepare', series('dll', 'build:docs', 'serve:docs'))

// ----------------------------------------
// Default
// ----------------------------------------
task('screener', series('screener:prepare', 'screener:runner'))

// ----------------------------------------
// Async
// ----------------------------------------
task('screener:async', series('screener:prepare', 'screener:runner:async'))
task('screener:await', cb => {
  const results = []
  const errors = []

  const flushedAwaiters = screenerAwaiters.map(awaiter =>
    awaiter.then(result => results.push(result)).catch(err => errors.push(err)),
  )

  screenerAwaiters.length = 0

  const processScreenerResults = Promise.all(flushedAwaiters).then(() => {
    const resultsReport = results
      .map(result => withHeader('screener:await : Result', result))
      .join('\n')
    console.log(resultsReport)

    const errorsReport = errors.map(error => withHeader('screener:await : ERROR', error)).join('\n')
    console.error(errorsReport)

    if (errors.length) {
      throw new Error(errorsReport)
    }
  })

  waitAndKillProcess(processScreenerResults, cb)
})
