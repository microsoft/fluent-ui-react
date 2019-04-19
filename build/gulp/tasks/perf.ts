import * as express from 'express'
import * as fs from 'fs'
import { task, series } from 'gulp'
import * as _ from 'lodash'
import * as ProgressBar from 'progress'
import * as puppeteer from 'puppeteer'
import * as rimraf from 'rimraf'
import { argv } from 'yargs'

import {
  NormalizedMeasures,
  ProfilerMeasure,
  ProfilerMeasureCycle,
  ReducedMeasures,
} from '../../../perf/types'
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

const reduceMeasures = (measures: ProfilerMeasure[], key: string): ReducedMeasures => {
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

const normalizeMeasures = (measures: ProfilerMeasureCycle[]): NormalizedMeasures => {
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

const getPercentDiff = (minValue: number, actualValue: number): number =>
  _.round((actualValue / minValue) * 100 - 100, 2)

const createMarkdownTable = (
  normalizedMeasures: NormalizedMeasures,
  metricName: string = 'actualTime',
  fields: string[] = ['avg', 'median'],
) => {
  const exampleMeasures = _.mapValues(
    normalizedMeasures,
    exampleMeasure => exampleMeasure[metricName],
  )

  const fieldLabels: string[] = _.flatMap(fields, field => [
    _.capitalize(field),
    `${_.capitalize(field)} diff`,
  ])
  const minFieldValues: Record<string, number> = _.zipObject(
    fields,
    _.map(fields, fieldName => _.min(_.map(exampleMeasures, fieldName))),
  )
  const fieldValues = _.mapValues(exampleMeasures, exampleMeasure =>
    _.reduce(
      exampleMeasure,
      (result, value, field) => {
        if (_.includes(fields, field)) {
          const minValue = minFieldValues[field]
          const percentDiff =
            minValue === value ? `**${value}**` : `+${getPercentDiff(minValue, value)}%`

          result.push(value, percentDiff)
        }

        return result
      },
      [],
    ),
  )

  return [
    `| Example | ${fieldLabels.join(' | ')} |`,
    `| --- | ${_.map(fieldLabels, () => ' --- ').join(' | ')} |`,
    ..._.map(
      exampleMeasures,
      (exampleMeasure, exampleName) =>
        `| ${exampleName} | ${fieldValues[exampleName].join(' | ')} |`,
    ),
  ].join('\n')
}

task('perf:clean', cb => {
  rimraf(paths.perfDist(), cb)
})

task('perf:build', cb => {
  webpackPlugin(require('../../../build/webpack.config.perf').default, cb)
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
    browser = await puppeteer.launch({
      args: [
        // Workaround for newPage hang in CircleCI: https://github.com/GoogleChrome/puppeteer/issues/1409#issuecomment-453845568
        process.env.CI && '--single-process',
      ].filter(Boolean),
    })

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
  const normalizedMeasures = normalizeMeasures(measures)

  fs.writeFileSync(resultsFile, JSON.stringify(normalizedMeasures, null, 2))

  log(colors.green('Results are written to "%s"'), resultsFile)
  console.log(createMarkdownTable(normalizedMeasures))
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
