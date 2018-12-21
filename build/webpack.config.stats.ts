import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as fs from 'fs'
import * as path from 'path'
import * as webpack from 'webpack'
import config from '../config'

const { paths } = config

// Interfaces no longer exist after transpiling, causing webpack to throw errors about them.
// ERROR:    https://github.com/webpack/webpack/issues/7378
// HACK FIX: https://github.com/TypeStrong/ts-loader/issues/653
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/

    const doneHook = stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(
        warn => !(warn && messageRegExp.test(warn.message)),
      )
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook)
    } else {
      compiler.plugin('done', doneHook)
    }
  }
}

const makeConfig = (srcPath, name) => ({
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: paths.dist(path.join('es', srcPath)),
  output: {
    filename: `${name}.js`,
    path: paths.base('stats'),
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'ts-loader',
        include: /src/,
        options: {
          configFile: paths.base('build/tsconfig.es.json'),
          transpileOnly: true,
          onlyCompileBundledFiles: true,
          compilerOptions: {
            declaration: false,
          },
        },
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
  },
  plugins: [
    new CleanWebpackPlugin([paths.base('stats')], {
      root: paths.base(),
      verbose: false, // do not log
    }),
    new IgnoreNotFoundExportPlugin(),
    new webpack.DefinePlugin(config.compiler_globals),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
})

export default [
  // entire package
  makeConfig('index', 'bundle-stardust-ui-react'),

  // lib (core)
  makeConfig('lib/index', 'bundle-stardust-ui-core'),

  // individual components
  ...fs
    .readdirSync(paths.src('components'))
    .map(dir => makeConfig(`components/${dir}/${dir}`, `component-${dir}`)),

  // individual themes
  ...fs
    .readdirSync(paths.src('themes'))
    .filter(dir => !/.*\.\w+$/.test(dir))
    .map(dir => makeConfig(`themes/${dir}`, `theme-${dir}`)),
]
