import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as webpack from 'webpack'

import config from '../config'

const { paths } = config
const { __DEV__, __PERF__, __PROD__ } = config.compiler_globals

const webpackConfig: any = {
  name: 'client',
  target: 'web',
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    app: paths.perfSrc('index'),
    vendor: config.compiler_vendor,
  },
  output: {
    filename: `[name].js`,
    path: paths.perfDist(),
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: config.compiler_devtool,
  node: {
    fs: 'empty',
    module: 'empty',
    child_process: 'empty',
    net: 'empty',
    readline: 'empty',
  },
  module: {
    noParse: [/anchor-js/],
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useCache: true,
          configFileName: __PERF__
            ? paths.base('build/tsconfig.perf.json')
            : paths.base('build/tsconfig.docs.json'),
          errorsAsWarnings: __DEV__,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(config.compiler_globals),
    new CopyWebpackPlugin([
      {
        from: paths.perfSrc('index.html'),
        to: paths.perfDist(),
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@stardust-ui/react': paths.src(),
      docs: paths.base('docs'),
      src: paths.src(),
    },
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )
}

export default webpackConfig
