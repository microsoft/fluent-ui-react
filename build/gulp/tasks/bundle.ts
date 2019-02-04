import { task, series, parallel, src, dest } from 'gulp'
import * as merge2 from 'merge2'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'
import { argv } from 'yargs'

import config from '../../../config'
import sh from '../sh'

const { paths } = config
const g = require('gulp-load-plugins')()
const { log, PluginError } = g.util

const buildUMD = !!argv.umd
const packageName: string = argv.package

// ----------------------------------------
// Clean
// ----------------------------------------

task('bundle:clean:es', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/es/*`, cb)
})

task('bundle:clean:commonjs', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/commonjs/*`, cb)
})

task('bundle:clean:umd', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/umd/*`, cb)
})

task('bundle:clean', parallel('bundle:clean:es', 'bundle:clean:commonjs', 'bundle:clean:umd'))

// ----------------------------------------
// Build
// ----------------------------------------
const createComponentSrc = () => [
  paths.packageSrc(packageName, '**/*.{ts,tsx}'),
  `!${paths.packageSrc(packageName, '**/umd.ts')}`,
]

task('bundle:build:commonjs', () => {
  const tsConfig = paths.base('build/tsconfig.commonjs.json')
  const settings = { declaration: true }

  const typescript = g.typescript.createProject(tsConfig, settings)
  const { dts, js } = src(createComponentSrc()).pipe(typescript())

  return merge2([
    dts.pipe(dest(paths.packageDist(packageName, 'commonjs'))),
    js.pipe(dest(paths.packageDist(packageName, 'commonjs'))),
  ])
})

task('bundle:build:es', () => {
  const tsConfig = paths.base('build/tsconfig.es.json')
  const settings = { declaration: true }

  const typescript = g.typescript.createProject(tsConfig, settings)
  const { dts, js } = src(createComponentSrc()).pipe(typescript())

  return merge2([
    dts.pipe(dest(paths.packageDist(packageName, 'es'))),
    js.pipe(dest(paths.packageDist(packageName, 'es'))),
  ])
})

task('bundle:build:umd', cb => {
  if (!buildUMD) {
    cb()
    return
  }

  process.env.NODE_ENV = 'build'
  const webpackUMDConfig = require('../../webpack.config.umd').default
  const compiler = webpack(webpackUMDConfig(packageName))

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

task('build:build', parallel('bundle:build:commonjs', 'bundle:build:es', 'bundle:build:umd'))

// ----------------------------------------
// Default
// ----------------------------------------

task('bundle', series('bundle:clean', 'build:build'))
task('bundle:all', () => sh('lerna run build'))
