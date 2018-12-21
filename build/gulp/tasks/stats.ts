import * as fs from 'fs'
import { task, parallel, series } from 'gulp'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as stableStringify from 'json-stable-stringify-without-jsonify'

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

task('build:stats:bundle', async () => {
  process.env.NODE_ENV = 'build'
  const webpackStatsConfig = require('../../webpack.config.stats').default

  const assets = await compileOneByOne(webpackStatsConfig)
  const results = _(assets)
    .map(({ name, size }) => ({ name, size }))
    .sortBy('name')
    .value()

  updateStatsFile(paths.docsSrc('bundleStats.json'), results)
})

task(
  'stats',
  series(
    parallel(series('clean:dist:es', 'build:dist:es'), 'build:docs:component-info'),
    'build:stats:bundle',
  ),
)
