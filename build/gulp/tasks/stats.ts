import * as fs from 'fs'
import * as glob from 'glob'
import { src, dest, task, parallel, series } from 'gulp'
import * as gzip from 'gzip-size'
import * as _ from 'lodash'
import * as prettyBytes from 'pretty-bytes'
import * as uglifyES from 'uglify-es'
import * as webpack from 'webpack'

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

task('build:stats:bundle', cb => {
  process.env.NODE_ENV = 'build'
  const webpackStatsConfig = require('../../webpack.config.stats').default
  const compiler = webpack(webpackStatsConfig)

  compiler.run((err, stats) => {
    const statsJson = stats.toJson()
    const { errors, warnings } = statsJson

    // log(stats.toString(config.compiler_stats))

    if (err) {
      log('Webpack compiler encountered a fatal error.')
      throw new PluginError('webpack', err.toString())
    }
    if (errors.length > 0) {
      log('Webpack compiler encountered errors.')
      throw new PluginError('webpack', errors.toString())
    }
    if (warnings.length > 0) {
      throw new PluginError('webpack', warnings.toString())
    }

    const results = _(statsJson.children)
      .flatMap('assets')
      .map(({ name, size }) => ({ name, size }))
      .sortBy('name')
      .value()

    log(
      JSON.stringify(
        results.map(({ size, ...rest }) => ({
          size: prettyBytes(size),
          ...rest,
        })),
        null,
        2,
      ),
    )

    cb(err)
  })
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
    parallel(
      series('clean:dist:es', 'build:dist:es'),
      series('clean:docs:component-info', 'build:docs:component-info'),
    ),
    parallel(
      'build:stats:bundle',
      // TODO: update this 'build:stats:without-imports',
    ),
  ),
)
