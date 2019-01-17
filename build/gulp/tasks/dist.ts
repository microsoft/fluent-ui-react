import { task, series, parallel, src, dest } from 'gulp'
import * as merge2 from 'merge2'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'

import config from '../../../config'

const { paths } = config
const g = require('gulp-load-plugins')()
const { log, PluginError } = g.util

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:dist:es', cb => {
  rimraf(`${config.paths.dist()}/es/*`, cb)
})

task('clean:dist:commonjs', cb => {
  rimraf(`${config.paths.dist()}/commonjs/*`, cb)
})

task('clean:dist:umd', cb => {
  rimraf(`${config.paths.dist()}/umd/*`, cb)
})

task('clean:dist', parallel('clean:dist:es', 'clean:dist:commonjs', 'clean:dist:umd'))

// ----------------------------------------
// Build
// ----------------------------------------
const componentsSrc = [paths.src('**/*.{ts,tsx}'), `!${paths.src('**/umd.ts')}`]

task('build:dist:commonjs', () => {
  const tsConfig = paths.base('build/tsconfig.commonjs.json')
  const settings = { declaration: true }
  const typescript = g.typescript.createProject(tsConfig, settings)

  const { dts, js } = src(componentsSrc).pipe(typescript())
  const types = src(paths.base('types/**'))

  return merge2([
    dts.pipe(dest(paths.dist('commonjs'))),
    js.pipe(dest(paths.dist('commonjs'))),
    types.pipe(dest(paths.dist('types'))),
  ])
})

task('build:dist:es', () => {
  const tsConfig = paths.base('build/tsconfig.es.json')
  const settings = { declaration: true }
  const typescript = g.typescript.createProject(tsConfig, settings)

  const { dts, js } = src(componentsSrc).pipe(typescript())
  const types = src(paths.base('types/**'))

  return merge2([
    dts.pipe(dest(paths.dist('es'))),
    js.pipe(dest(paths.dist('es'))),
    types.pipe(dest(paths.dist('types'))),
  ])
})

task('build:dist:umd', cb => {
  process.env.NODE_ENV = 'build'
  const webpackUMDConfig = require('../../webpack.config.umd').default
  const compiler = webpack(webpackUMDConfig)

  compiler.run((err, stats) => {
    const { errors, warnings } = stats.toJson()

    log(stats.toString(config.compiler_stats))

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

    cb(err)
  })
})

task('build:dist', parallel('build:dist:commonjs', 'build:dist:es', 'build:dist:umd'))

// ----------------------------------------
// Default
// ----------------------------------------

task('dist', series('clean:dist', 'build:dist'))
