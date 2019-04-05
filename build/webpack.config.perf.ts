import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import { webpack as lernaAliases } from 'lerna-alias'
import { argv } from 'yargs'

import config from '../config'

const { paths } = config

const webpackConfig: any = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    app: paths.perfSrc('index'),
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
          configFileName: paths.base('build/tsconfig.perf.json'),
          useCache: true,
        },
      },
    ],
  },
  plugins: [
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
      ...lernaAliases(),
      docs: paths.base('docs'),
      src: paths.packageSrc('react'),

      // We are using React in production mode with tracing.
      // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
  optimization: {
    nodeEnv: !!argv.debug ? 'development' : 'production',
  },
}

export default webpackConfig
