import { task, series, parallel, src, dest } from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'rimraf'
import webpack from 'webpack'
import { argv } from 'yargs'

import config from '../../../config'
import sh from '../sh'

const g = require('gulp-load-plugins')()

const { paths } = config
const { log, PluginError } = g.util

const packageName = (argv.package as string) || 'react'

// ----------------------------------------
// Clean
// ----------------------------------------

task('bundle:package:clean:es', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/es/*`, cb)
})

task('bundle:package:clean:commonjs', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/commonjs/*`, cb)
})

task('bundle:package:clean:umd', cb => {
  rimraf(`${config.paths.packageDist(packageName)}/umd/*`, cb)
})

task(
  'bundle:package:clean',
  parallel('bundle:package:clean:es', 'bundle:package:clean:commonjs', 'bundle:package:clean:umd'),
)

// ----------------------------------------
// Build
// ----------------------------------------
const componentsSrc = [
  paths.packageSrc(packageName, '**/*.{ts,tsx}'),
  `!${paths.packageSrc(packageName, '**/umd.ts')}`,
]

task('bundle:package:commonjs', () =>
  src(componentsSrc)
    .pipe(babel())
    .pipe(dest(paths.packageDist(packageName, 'commonjs'))),
)

task('bundle:package:es', () =>
  src(componentsSrc)
    .pipe(babel({ caller: { useESModules: true } }))
    .pipe(dest(paths.packageDist(packageName, 'es'))),
)

task('bundle:package:types', () => {
  const tsConfig = paths.base('build/tsconfig.json')
  const typescript = g.typescript.createProject(tsConfig, {
    declaration: true,
    isolatedModules: false,
    module: 'esnext',
  })

  return src(componentsSrc)
    .pipe(typescript())
    .dts.pipe(dest(paths.packageDist(packageName, 'es')))
})

task('bundle:package:umd', cb => {
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

// ----------------------------------------
// Default
// ----------------------------------------

task(
  'bundle:package:no-umd',
  series(
    'bundle:package:clean',
    parallel('bundle:package:commonjs', 'bundle:package:es', 'bundle:package:types'),
  ),
)
task('bundle:package', series('bundle:package:no-umd', 'bundle:package:umd'))

task('bundle:all-packages', () => sh('lerna run build'))
