import * as express from 'express'
import * as fs from 'fs'
import { task, series } from 'gulp'
import * as _ from 'lodash'
import * as ProgressBar from 'progress'
import * as puppeteer from 'puppeteer'
import * as rimraf from 'rimraf'
import { argv } from 'yargs'

import {
  MeasuredValues,
  PerExamplePerfMeasures,
  ProfilerMeasure,
  ProfilerMeasureCycle,
  ProfilerMeasureWithBaseline,
  ReducedMeasures,
} from '../../../perf/types'
import config from '../../../config'
import webpackPlugin from '../plugins/gulp-webpack'

const { paths } = config
const { colors, log } = require('gulp-load-plugins')().util

const DEFAULT_RUN_TIMES = 10
let server

const floor = (value: number) => _.floor(value, 2)

const computeMeasureMedian = (measures: number[]) => {
  const values = _.sortBy(measures)

  const lowMiddle = Math.floor((values.length - 1) / 2)
  const highMiddle = Math.ceil((values.length - 1) / 2)

  return (values[lowMiddle] + values[highMiddle]) / 2
}

// This is a hardcoded constant which makes normalized results comparable with real render times.
// By running baseline test on multiple machines, we found out the baseline example takes ~15/7 ms to render in average.
// So if we divide render times by baseline times we must multiply them back by the fixed coefficient to get comparable numbers.
const NORMALIZATION_COEFFICIENT: Record<MeasuredValues, number> = {
  actualTime: 15,
  baseTime: 7,
}

const normalizeMeasure = (measure: ProfilerMeasureWithBaseline, key: MeasuredValues): number =>
  (measure[key] * NORMALIZATION_COEFFICIENT[key]) / measure.baseline[key]

const reduceMeasures = (
  measures: ProfilerMeasureWithBaseline[],
  key: MeasuredValues,
): ReducedMeasures => {
  if (measures.length === 0) throw new Error('`measures` are empty')

  let min = measures[0][key]
  let max = measures[0][key]
  let sum = measures[0][key]
  let sumNormalized = normalizeMeasure(measures[0], key)

  for (let i = 1; i < measures.length; i++) {
    if (measures[i][key] < min) min = measures[i][key]
    if (measures[i][key] > max) max = measures[i][key]

    sum += measures[i][key]
    sumNormalized += normalizeMeasure(measures[i], key)
  }

  return {
    avg: floor(sum / measures.length),
    avgNormalized: floor(sumNormalized / measures.length),
    median: floor(computeMeasureMedian(_.map(measures, measure => measure[key]))),
    medianNormalized: floor(
      computeMeasureMedian(_.map(measures, measure => normalizeMeasure(measure, key))),
    ),
    min: floor(min),
    max: floor(max),
    values: _.map(measures, measure => ({
      exampleIndex: measure.exampleIndex,
      value: measure[key],
      baseline: measure.baseline[key],
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

  return _.mapValues(perExampleMeasures, (profilerMeasures: ProfilerMeasureWithBaseline[]) => ({
    actualTime: reduceMeasures(profilerMeasures, 'actualTime'),
    baseTime: reduceMeasures(profilerMeasures, 'baseTime'),
  }))
}

const getPercentDiff = (minValue: number, actualValue: number): number =>
  _.round((actualValue / minValue) * 100 - 100, 2)

const createMarkdownTable = (
  perExamplePerfMeasures: PerExamplePerfMeasures,
  metricName: MeasuredValues = 'actualTime',
  fields: ('avg' | 'avgNormalized' | 'median' | 'medianNormalized')[] = [
    'avg',
    'avgNormalized',
    'median',
    'medianNormalized',
  ],
) => {
  const exampleMeasures = _.mapValues(
    perExamplePerfMeasures,
    exampleMeasure => exampleMeasure[metricName],
  )

  const fieldLabels: string[] = _.flatMap(fields, field => [
    _.startCase(field),
    `${_.startCase(field)} diff`,
  ])
  const minFieldValues: Record<string, number> = _.zipObject(
    fields,
    _.map(fields, fieldName => _.min(_.map(exampleMeasures, fieldName))),
  )
  const fieldValues = _.mapValues(exampleMeasures, exampleMeasure =>
    _.flatMap(fields, field => {
      const minValue = minFieldValues[field]
      const value = exampleMeasure[field]
      const percentDiff =
        minValue === value ? `**${value}**` : `+${getPercentDiff(minValue, value)}%`
      return [value, percentDiff]
    }),
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
