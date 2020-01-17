import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { webpack as lernaAliases } from 'lerna-alias'
import _ from 'lodash'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import config from './config'

const { paths } = config
const { __DEV__, __PROD__ } = config.compiler_globals

const webpackConfig: any = {
  name: 'client',
  target: 'web',
  mode: config.compiler_mode,
  entry: {
    app: paths.docsSrc('index'),
  },
  output: {
    // https://webpack.js.org/guides/build-performance/#avoid-production-specific-tooling
    filename: __DEV__ ? '[name].js' : `[name].[${config.compiler_hash_type}].js`,
    path: config.compiler_output_path,
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: config.compiler_devtool,
  externals: {
    '@babel/standalone': 'Babel',
    'anchor-js': 'AnchorJS',
    'prettier/standalone': 'prettier',
    // These Prettier plugins are available under window.prettierPlugins
    'prettier/parser-babylon': ['prettierPlugins', 'babylon'],
    'prettier/parser-html': ['prettierPlugins', 'html'],
    'prettier/parser-typescript': ['prettierPlugins', 'typescript'],
    'prop-types': 'PropTypes',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOMServer',
  },
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheCompression: false,
          cacheDirectory: __DEV__,
          plugins: [__DEV__ && 'react-hot-loader/babel'].filter(Boolean),
        },
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.base('build/tsconfig.docs.json'),
      watch: [paths.docsSrc(), paths.packages()],
    }),
    new webpack.DefinePlugin(config.compiler_globals),
    new webpack.ContextReplacementPlugin(
      /node_modules[\\|/]typescript[\\|/]lib/,
      /typescript\.js/,
      false,
    ),
    new CopyWebpackPlugin([
      {
        from: paths.docsSrc('public'),
        to: paths.docsDist('public'),
      },
    ]),
    new HtmlWebpackPlugin({
      template: paths.docsSrc('index.ejs'),
      filename: 'index.html',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: __PROD__,
      },
      versions: {
        babelStandalone: require('@babel/standalone/package.json').version,
        lodash: require('lodash/package.json').version,
        prettier: require('prettier/package.json').version,
        propTypes: require('prop-types/package.json').version,
        react: require('react/package.json').version,
        reactDOM: require('react-dom/package.json').version,
        fluentUI: require('../package.json').version,
        reactVis: require('react-vis/package.json').version,
      },
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    __DEV__ &&
      !process.env.CI &&
      new webpack.ProgressPlugin({
        entries: true,
        modules: true,
        modulesCount: 500,
      }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ...lernaAliases(),
      src: paths.packageSrc('react'),
      docs: paths.base('docs'),
    },
  },
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  performance: false,
}

// ------------------------------------
// Environment Configuration
// ------------------------------------
if (__DEV__) {
  const webpackHotPath = `${config.compiler_public_path}__webpack_hmr`
  const webpackHotMiddlewareEntry = `webpack-hot-middleware/client?${_.map(
    {
      path: webpackHotPath, // The path which the middleware is serving the event stream on
      timeout: 2000, // The time to wait after a disconnection before attempting to reconnect
      overlay: true, // Set to false to disable the DOM-based client-side overlay.
      reload: true, // Set to true to auto-reload the page when webpack gets stuck.
      noInfo: false, // Set to true to disable informational console logging.
      quiet: false, // Set to true to disable all console logging.
    },
    (val, key) => `&${key}=${val}`,
  ).join('')}`

  webpackConfig.entry.app = [webpackHotMiddlewareEntry].concat(webpackConfig.entry.app)
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )

  webpackConfig.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ]
}

if (process.env.ANALYZE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig
