import * as path from 'path'
import { webpackConfig, webpackMerge, htmlOverlay } from 'just-scripts'

const IgnoreNotFoundExportWebpackPlugin = require('ignore-not-found-export-webpack-plugin')

// This is the default webpack config for creating story bundles for consumers.
// This config is not used to bundle this package for release.

// TODO:
// these paths need to be accurate for pathing into library distribution, not source.
// is require.resolve the best thing to use here?
const defaultConfig = webpackMerge(
  webpackConfig,
  htmlOverlay({
    // TODO: is require.resolve really needed here? path.join / __dirname instead?
    template: require.resolve('../assets/index.html'),
  }),
  {
    // TODO: should entry really be pointing to lib output rather than ts?
    entry: require.resolve('../lib/bundle/index.digest.js'),
    mode: 'production',
    output: {
      filename: 'digest.js',
    },
    resolve: {
      alias: {
        // TODO: this needs to work for both digest and consumer
        // TODO: is this still needed? (also in tsconfig.json)
        stories: path.resolve(__dirname, '.'),
      },
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      // This plugin was added to ignore warnings wherever types are imported.
      new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }),
    ],
  },
)

export default defaultConfig
