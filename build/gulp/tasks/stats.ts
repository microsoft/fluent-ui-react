import * as fs from 'fs'
import * as glob from 'glob'
import { src, dest, task, parallel, series } from 'gulp'
import * as gzip from 'gzip-size'
import * as _ from 'lodash'
import * as prettyBytes from 'pretty-bytes'
import * as uglifyES from 'uglify-es'
import * as webpack from 'webpack'
import * as stableStringify from 'json-stable-stringify-without-jsonify'

import config from '../../../config'

const g = require('gulp-load-plugins')()
const { version } = require('../../../package.json')
const { paths } = config
const { log, PluginError } = g.util

// ----------------------------------------
// Stats
// ----------------------------------------
task('build:stats:file', () => {
  const tsConfig = paths.base('build/tsconfig.es.json')
  const typescript = g.typescript.createProject(tsConfig)

  const { js } = src(paths.base('build/stats/allComponents.tsx')).pipe(typescript())

  return js.pipe(dest(paths.base('build/stats')))
})

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
    console.log(leftMatch, rightMatch)
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
        reject(new PluginError('webpack', warnings.toString()))
      }

      resolve(statsJson)
    })
  })
}

async function compileOneByOne(allConfigs) {
  let assets = []
  for (const config of allConfigs) {
    console.log('>', config.output.filename)
    try {
      const result = await webpackAsync(config)
      assets = [...assets, ...result.assets]
      console.log('<', result.assets[0].name)
    } catch (err) {
      console.log('E', config.output.filename, err)
      throw err
    }
  }
  return assets
}

function updateStatsFile(filePath: string, currentBundleStats: any) {
  let stats = {}
  if (fs.existsSync(filePath)) {
    stats = require(filePath)
  }

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

task('build:stats:without-imports', cb => {
  const stats = {
    [version]: {
      components: 0,
      subcomponents: 0,
      componentsMin: 0,
      componentsGzip: 0,
    },
  }

  glob(paths.docsSrc('componentInfo', '*.info.json'), (err, infoFiles) => {
    if (err) return cb(err)

    infoFiles.forEach((infoFile, infoFileIndex) => {
      const { displayName, isChild, isParent } = require(infoFile)
      if (isChild) {
        stats[version].subcomponents += 1
      }

      if (isParent) {
        stats[version].components += 1

        glob(paths.dist('es', 'components', displayName, '*.js'), (err, jsFiles) => {
          if (err) return cb(err)

          stats[version][displayName] = {
            min: 0,
            gzip: 0,
          }

          jsFiles.forEach(jsFile => {
            const content = fs.readFileSync(jsFile, 'utf8')
            const minified = uglifyES.minify(content).code
            const minBytes = minified.length
            const gzipBytes = gzip.sync(minified)

            stats[version].componentsMin += minBytes
            stats[version].componentsGzip += gzipBytes
            stats[version][displayName].min += minBytes
            stats[version][displayName].gzip += gzipBytes
          })

          stats[version][displayName].min = prettyBytes(stats[version][displayName].min)
          stats[version][displayName].gzip = prettyBytes(stats[version][displayName].gzip)

          if (infoFileIndex === infoFiles.length - 1) {
            stats[version].componentsMin = prettyBytes(stats[version].componentsMin)
            stats[version].componentsGzip = prettyBytes(stats[version].componentsGzip)

            const statsPath = paths.docsSrc('stats.json')
            const originalStats = require(paths.docsSrc('stats.json'))
            const mergedStats = _.merge(originalStats, stats)
            fs.writeFileSync(statsPath, JSON.stringify(mergedStats, null, 2))
            cb()
          }
        })
      }
    })
  })
})

// ----------------------------------------
// Default
// ----------------------------------------

task(
  'stats',
  series(
    parallel(series('clean:dist:es', 'build:dist:es'), 'build:docs:component-info'),
    parallel(
      'build:stats:bundle',
      // TODO: update this 'build:stats:without-imports',
    ),
  ),
)
