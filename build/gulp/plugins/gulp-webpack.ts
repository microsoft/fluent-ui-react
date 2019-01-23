import * as webpack from 'webpack'
import config from '../../../config'

const { log, PluginError } = require('gulp-load-plugins')().util

const webpackPlugin = (webpackConfig, cb) => {
  webpack(webpackConfig).run((err, stats) => {
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
}

export default webpackPlugin
