import * as fs from 'fs'
import { task, parallel, series } from 'gulp'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as stableStringify from 'json-stable-stringify-without-jsonify'
import { argv } from 'yargs'
import * as requestHttp from 'request-promise-native'

import config from '../../../config'

const g = require('gulp-load-plugins')()
const { paths } = config
const { log, PluginError } = g.util

const UNRELEASED_VERSION_STRING = 'Unreleased'
const SEMVER_MATCHER = /(\d+)\.(\d+)\.(\d+)/

const semverCmp = (a, b) => {
  const left = a.key
  const right = b.key

  // Unreleased first
  if (left === UNRELEASED_VERSION_STRING) {
    return -1
  }
  if (right === UNRELEASED_VERSION_STRING) {
    return 1
  }

  // x.y.z semver DESC
  const leftMatch = left.match(SEMVER_MATCHER)
  const rightMatch = right.match(SEMVER_MATCHER)
  if (leftMatch && rightMatch) {
    for (let i = 1; i <= 3; i++) {
      const partOfLeft = Number(leftMatch[i])
      const partOfRight = Number(rightMatch[i])
      if (partOfLeft > partOfRight) return -1
      if (partOfRight > partOfLeft) return 1
    }
  }

  // rest ASC
  if (left < right) return -1
  if (left > right) return 1

  return 0
}

function webpackAsync(config): Promise<any> {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config)
    compiler.run((err, stats) => {
      const statsJson = stats.toJson()
      const { errors, warnings } = statsJson

      if (err) {
        log('Webpack compiler encountered a fatal error.')
        reject(new PluginError('webpack', err.toString()))
      }
      if (errors.length > 0) {
        log('Webpack compiler encountered errors.')
        reject(new PluginError('webpack', errors.toString()))
      }
      if (warnings.length > 0) {
        log('Webpack compiler encountered warnings.')
        reject(new PluginError('webpack', warnings.toString()))
      }

      resolve(statsJson)
    })
  })
}

async function compileOneByOne(allConfigs) {
  let assets = []
  for (const config of allConfigs) {
    log('Compiling', config.output.filename)
    try {
      const result = await webpackAsync(config)
      assets = [...assets, ...result.assets]
      log('Done', result.assets[0].name) // All builds should produce just single asset
    } catch (err) {
      log('Error', config.output.filename)
      throw err
    }
  }
  return assets
}

function updateStatsFile(filePath: string, currentBundleStats: any) {
  const stats = fs.existsSync(filePath) ? require(filePath) : {}

  stats[UNRELEASED_VERSION_STRING] = {
    bundles: currentBundleStats,
  }

  fs.writeFileSync(
    filePath,
    stableStringify(stats, {
      cmp: semverCmp,
      space: 2,
    }),
  )
}

function writeCurrentStats(filePath: string, currentBundleStats: any) {
  const statsData = _.chain(currentBundleStats)
    .keyBy('name')
    .mapValues(result => ({ size: result.size }))
    .value()

  fs.writeFileSync(filePath, JSON.stringify(statsData, null, 2))
}

const currentStatsFilePath = paths.docsSrc('currentBundleStats.json')

task('stats:build:bundle', async () => {
  process.env.NODE_ENV = 'build'
  const webpackStatsConfig = require('../../webpack.config.stats').default

  const assets = await compileOneByOne(webpackStatsConfig)
  const results = _(assets)
    .map(({ name, size }) => ({ name, size }))
    .sortBy('name')
    .value()

  updateStatsFile(paths.docsSrc('bundleStats.json'), results)
  writeCurrentStats(currentStatsFilePath, results)
})

task(
  'stats',
  series(parallel('bundle:all-packages', 'build:docs:component-info'), 'stats:build:bundle'),
)

function readSummaryPerfStats() {
  return _.chain(require(paths.perfDist('result.json')))
    .mapKeys((value, key) => _.camelCase(key)) // mongodb does not allow dots in keys
    .mapValues(result => ({
      actualTime: _.omit(result.actualTime, 'values'),
      baseTime: _.omit(result.baseTime, 'values'),
    }))
    .value()
}

function readCurrentBundleStats() {
  return _.mapKeys(require(currentStatsFilePath), (value, key) => _.camelCase(key)) // mongodb does not allow dots in keys
}

task('stats:save', async () => {
  const commandLineArgs = _.pick(argv, ['sha', 'branch', 'tag', 'pr', 'build'])
  const bundleStats = readCurrentBundleStats()
  const perfStats = readSummaryPerfStats()

  const statsPayload = {
    sha: process.env.CIRCLE_SHA1,
    branch: process.env.CIRCLE_BRANCH,
    pr: process.env.CIRCLE_PULL_REQUEST, // optional
    build: process.env.CIRCLE_BUILD_NUM,
    ...commandLineArgs, // allow command line overwrites
    bundleSize: bundleStats,
    performance: perfStats,
    ts: new Date(),
  }

  // payload sanity check
  _.forEach(['sha', 'branch', 'build', 'bundleSize', 'performance'], fieldName => {
    if (statsPayload[fieldName] === undefined) {
      throw `Required field '${fieldName}' not set in stats payload`
    }
  })

  const options = {
    method: 'POST',
    uri: process.env.STATS_URI,
    body: statsPayload,
    json: true,
  }

  const response = await requestHttp(options)
  console.log(response)
})
