// import * as webpack from 'webpack'

import config from '../config'
import webpackConfig from '../webpack.config'

const pkg = require('../package.json')
const { paths } = config

const webpackUMDConfig = {
  target: 'web',
  mode: 'production',
  devtool: false,
  entry: {
    [pkg.name]: paths.src('umd.ts'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'stardust-ui-react.min.js',
    libraryTarget: 'umd',
    library: 'Stardust',
    path: paths.dist('umd'),
    publicPath: '/',
    pathinfo: true,
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       unused: true,
  //       dead_code: true,
  //       warnings: false,
  //     },
  //   }),
  // ],
  resolve: webpackConfig.resolve,
  module: {
    noParse: webpackConfig.module.noParse,
    rules: webpackConfig.module.rules,
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
}

export default webpackUMDConfig
