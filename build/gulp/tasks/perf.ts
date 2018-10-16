import { task, series } from 'gulp'
import { argv } from 'yargs'

const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const chalk = require('chalk')

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

interface Example {
  url: string
  name: string
  group: string
}

interface ExampleResult extends Example {
  lighthouse: any
}

function getExampleFiles(filter = ''): Example[] {
  return glob
    .sync(`docs/src/examples/**/${filter}*.tsx`, { ignore: ['**/index.tsx', '**/*.knobs.tsx'] })
    .map(examplePath => {
      const { name: nameWithoutExtension, base: nameWithExtension } = path.parse(examplePath)

      const group = /^docs\/src\/examples\/([^/]+\/[^/]+)/.exec(examplePath)

      return {
        url: `http://localhost:8080/maximize/${_.kebabCase(nameWithoutExtension)}`,
        name: nameWithExtension,
        group: (group && group[1]) || 'general',
      }
    })
}

async function launchChromeAndRunLighthouse(flags, config) {
  const { filter, headless } = argv
  const chromeConfig = {
    ...(headless && { chromeFlags: ['--headless'] }),
  }

  const chrome = await chromeLauncher.launch(chromeConfig)
  flags.port = chrome.port

  const results: (Example & { lighthouse?: any })[] = []
  const measure = getExampleFiles(filter)

  for (let i = 0; i < measure.length; i++) {
    process.stdout.write(chalk.dim(measure[i].url))
    const lighthouseResult = await lighthouse(measure[i].url, flags, config).then(
      lighthouseReport =>
        _.find(
          lighthouseReport.lhr.audits['user-timings'].details.items,
          i => i.name === 'stardust.perf.measureMount',
        ),
    )

    const result: ExampleResult = {
      ...measure[i],
      lighthouse: lighthouseResult,
    }
    results.push(result)
    if (lighthouseResult) {
      console.log(` ${lighthouseResult.duration} ms`)
    } else {
      console.log(chalk.red(' error'))
    }
  }

  await chrome.kill()
  return _.groupBy(results, 'group')
}

function printResults(results) {
  console.log()
  console.log(
    chalk.bold('========================== Performance tests results ==========================='),
  )
  _.forEach(results, (groupResults, groupName) => {
    const stats = _.reduce(
      groupResults,
      (sum, testResult) => {
        let aggregate
        if (testResult.lighthouse) {
          const duration = testResult.lighthouse.duration
          aggregate = {
            ...sum,
            count: sum.count + 1,
            min: sum.min ? Math.min(duration, sum.min) : duration,
            max: sum.max ? Math.max(duration, sum.max) : duration,
            total: sum.total + duration,
          }
        } else {
          aggregate = {
            ...sum,
            count: sum.count + 1,
            errors: sum.errors ? sum.errors + 1 : 1,
          }
        }
        return aggregate
      },
      {
        count: 0,
        total: 0,
      },
    )

    let details = ''
    if (stats.count > 0) {
      let errorMsg = ''
      if (stats.errors) {
        errorMsg = `, ${stats.errors} ERROR(S)!!!`
      }
      details = `${errorMsg}, avg = ${stats.total / stats.count} ms, max = ${stats.max} ms, min = ${
        stats.min
      } ms`
    }

    console.log(`${groupName} ${stats.count} test(s)${details}`)

    if (argv.details) {
      _.forEach(groupResults, testResult => {
        const duration = testResult.lighthouse ? `${testResult.lighthouse.duration} ms` : 'ERROR'
        console.log(`\t${testResult.name}  ${duration}`)
      })
    }
  })
  console.log(
    chalk.bold('================================================================================'),
  )
  console.log()
}

task('lighthouse', cb => {
  const config = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance'],
      useThrottling: false,
      disableDeviceEmulation: true,
    },
  }

  return launchChromeAndRunLighthouse({}, config)
    .then(results => {
      printResults(results)
      cb()
      process.exit(0)
    })
    .catch(err => {
      // console.error(err)
      cb(err)
      process.exit(1)
    })
})

task('perf', series('dll', 'build:docs', 'serve:docs', 'lighthouse'))
