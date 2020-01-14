import { task, series, parallel, src, dest } from 'gulp'
import babel from 'gulp-babel'
import del from 'del'
import webpack from 'webpack'

import config from '../../../config'
import sh from '../sh'

const g = require('gulp-load-plugins')()

const { paths } = config
const { log, PluginError } = g.util

const packageName = config.package

// ----------------------------------------
// Clean
// ----------------------------------------

task('bundle:package:clean', () =>
  del([
    `${paths.packageDist(packageName)}/es/*`,
    `${paths.packageDist(packageName)}/commonjs/*`,
    `${paths.packageDist(packageName)}/umd/*`,
    `${paths.packageDist(packageName)}/dts`,
  ]),
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
    .pipe(babel({ caller: { useESModules: true } } as any))
    .pipe(dest(paths.packageDist(packageName, 'es'))),
)

task('bundle:package:types:tsc', () => {
  let cmd = 'tsc -b'
  if (process.cwd() === config.path_base) {
    cmd = `cd packages && cd ${packageName} && ${cmd}`
  }
  return sh(cmd)
})
task('bundle:package:types:copy', () => {
  return src(paths.packageDist(packageName, 'dts/src/**/*.d.ts')).pipe(
    dest(paths.packageDist(packageName, 'es')),
  )
})
task('bundle:package:types', series('bundle:package:types:tsc', 'bundle:package:types:copy'))

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

task('bundle:all-packages', async () => {
  await sh('lerna run build')
  return del(`${config.paths.packages()}/*/dist/dts`)
})
