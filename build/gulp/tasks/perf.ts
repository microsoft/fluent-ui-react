import * as express from 'express'
import * as fs from 'fs'
import { task, series } from 'gulp'
import * as _ from 'lodash'
import * as puppeteer from 'puppeteer'
import * as rimraf from 'rimraf'
import { argv } from 'yargs'

import { ProfilerMeasure, ProfilerMeasureCycle } from '../../../perf/types'
import config from '../../../config'
import webpackPlugin from '../plugins/gulp-webpack'

const { paths } = config
const { colors, log } = require('gulp-load-plugins')().util

const DEFAULT_RUN_TIMES = 10
let server

const floor = (value: number) => _.floor(value, 2)

const computeMeasureMedian = (measures: ProfilerMeasure[], key: string) => {
  const values = _.sortBy(measures, key)

  const lowMiddle = Math.floor((values.length - 1) / 2)
  const highMiddle = Math.ceil((values.length - 1) / 2)

  return (values[lowMiddle][key] + values[highMiddle][key]) / 2
}

const reduceMeasures = (measures: ProfilerMeasure[], key: string) => {
  if (measures.length === 0) throw new Error('`measures` are empty')

  let min = measures[0][key]
  let max = measures[0][key]
  let sum = measures[0][key]

  for (let i = 1; i < measures.length; i++) {
    if (measures[i][key] < min) min = measures[i][key]
    if (measures[i][key] > max) max = measures[i][key]

    sum = sum + measures[i][key]
  }

  return {
    avg: floor(sum / measures.length),
    median: floor(computeMeasureMedian(measures, key)),
    min: floor(min),
    max: floor(max),
    values: _.map(measures, measure => ({
      exampleIndex: measure.exampleIndex,
      value: measure[key],
    })),
  }
}

const normalizeMeasures = (measures: ProfilerMeasureCycle[]) => {
  const perExampleMeasures = _.reduce(
    measures,
    (result, cycle: ProfilerMeasureCycle) => {
      _.forEach(cycle, (value: ProfilerMeasure, exampleName: string) => {
        result[exampleName] = [...(result[exampleName] || []), value]
      })

      return result
    },
    {},
  )

  return _.mapValues(perExampleMeasures, (measures: ProfilerMeasure[]) => ({
    actualTime: reduceMeasures(measures, 'actualTime'),
    baseTime: reduceMeasures(measures, 'baseTime'),
  }))
}

task('perf:clean', cb => {
  rimraf(paths.perfDist(), cb)
})

task('perf:build', cb => {
  webpackPlugin(require('../../../build/webpack.config.perf').default, cb)
})

task('perf:run', async () => {
  const measures: ProfilerMeasureCycle[] = []
  const times = argv.times || DEFAULT_RUN_TIMES
  let browser

  try {
    browser = await puppeteer.launch()

    for (let i = 0; i < times; i++) {
      const page = await browser.newPage()
      await page.goto(`http://${config.server_host}:${config.perf_port}`)

      const measuresFromStep = await page.evaluate(() => window.runMeasures())
      measures.push(measuresFromStep)

      await page.close()
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }

  const resultsFile = paths.perfDist('result.json')

  fs.writeFileSync(resultsFile, JSON.stringify(normalizeMeasures(measures), null, 2))
  log(colors.green('Results are written to "%s"'), resultsFile)
})

task('perf:serve', cb => {
  server = express()
    .use(express.static(paths.perfDist()))
    .listen(config.perf_port, config.server_host, () => {
      log(colors.yellow('Server running at http://%s:%d'), config.server_host, config.perf_port)
      cb()
    })
})

task('perf:serve:stop', cb => {
  if (server) server.close(cb)
})

task('perf', series('perf:clean', 'perf:build', 'perf:serve', 'perf:run', 'perf:serve:stop'))
