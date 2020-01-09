import express from 'express'
import fs from 'fs'
import { series, task } from 'gulp'
import { colors, log } from 'gulp-util'
import _ from 'lodash'
import ProgressBar from 'progress'
import puppeteer from 'puppeteer'
import del from 'del'
import { argv } from 'yargs'
import markdownTable from 'markdown-table'

import {
  MeasuredValues,
  PerExamplePerfMeasures,
  ProfilerMeasure,
  ProfilerMeasureCycle,
  ReducedMeasures,
} from '../../../perf/types'
import config from '../../config'
import webpackPlugin from '../plugins/gulp-webpack'
import { safeLaunchOptions } from 'build/puppeteer.config'

const { paths } = config

const DEFAULT_RUN_TIMES = 10
let server

const floor = (value: number) => _.floor(value, 2)

const computeMeasureMedian = (measures: number[]) => {
  const values = _.sortBy(measures)

  const lowMiddle = Math.floor((values.length - 1) / 2)
  const highMiddle = Math.ceil((values.length - 1) / 2)

  return (values[lowMiddle] + values[highMiddle]) / 2
}

const reduceMeasures = (measures: ProfilerMeasure[], key: MeasuredValues): ReducedMeasures => {
  if (measures.length === 0) throw new Error('`measures` are empty')

  let min = measures[0][key]
  let max = measures[0][key]
  let sum = measures[0][key]

  for (let i = 1; i < measures.length; i++) {
    if (measures[i][key] < min) min = measures[i][key]
    if (measures[i][key] > max) max = measures[i][key]

    sum += measures[i][key]
  }

  return {
    avg: floor(sum / measures.length),
    median: floor(computeMeasureMedian(_.map(measures, measure => measure[key]))),
    min: floor(min),
    max: floor(max),
    values: _.map(measures, measure => ({
      exampleIndex: measure.exampleIndex,
      value: measure[key],
    })),
  }
}

const sumByExample = (measures: ProfilerMeasureCycle[]): PerExamplePerfMeasures => {
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

  return _.mapValues(perExampleMeasures, (profilerMeasures: ProfilerMeasure[]) => ({
    actualTime: reduceMeasures(profilerMeasures, 'actualTime'),
  }))
}

type NumberPropertyNames<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T]

const createMarkdownTable = (
  perExamplePerfMeasures: PerExamplePerfMeasures,
  metricName: MeasuredValues = 'actualTime',
  fields: NumberPropertyNames<ReducedMeasures>[] = ['min', 'avg', 'median', 'max'],
) => {
  const exampleMeasures = _.mapValues(
    perExamplePerfMeasures,
    exampleMeasure => exampleMeasure[metricName],
  )

  const fieldLabels: string[] = _.map(fields, _.startCase)
  const fieldValues = _.mapValues(exampleMeasures, exampleMeasure =>
    _.flatMap(fields, field => exampleMeasure[field]),
  )

  return markdownTable([
    ['Example', ...fieldLabels],
    ..._.sortBy(
      _.map(exampleMeasures, (exampleMeasure, exampleName) => [
        exampleName,
        ...fieldValues[exampleName],
      ]),
      row => -row[fields.indexOf('median')],
    ),
  ])
}

task('perf:clean', () => del(paths.perfDist()))

task('perf:build', cb => {
  webpackPlugin(require('../../webpack.config.perf').default, cb)
})

task('perf:run', async () => {
  const measures: ProfilerMeasureCycle[] = []
  const times = (argv.times as string) || DEFAULT_RUN_TIMES
  const filter = argv.filter

  const bar = process.env.CI
    ? { tick: _.noop }
    : new ProgressBar(':bar :current/:total', { total: times })

  let browser

  try {
    browser = await puppeteer.launch(safeLaunchOptions())

    for (let i = 0; i < times; i++) {
      const page = await browser.newPage()
      await page.goto(`http://${config.server_host}:${config.perf_port}`)

      const measuresFromStep = await page.evaluate(filter => window.runMeasures(filter), filter)
      measures.push(measuresFromStep)
      bar.tick()

      await page.close()
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }

  const resultsFile = paths.perfDist('result.json')
  const perExamplePerfMeasures = sumByExample(measures)

  fs.writeFileSync(resultsFile, JSON.stringify(perExamplePerfMeasures, null, 2))

  log(colors.green('Results are written to "%s"'), resultsFile)
  console.log('\n# Measures\n')
  console.log(createMarkdownTable(perExamplePerfMeasures))
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
task('perf:debug', series('perf:clean', 'perf:build', 'perf:serve'))
