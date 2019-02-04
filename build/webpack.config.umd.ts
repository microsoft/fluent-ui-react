import config from '../config'
import webpackConfig from '../webpack.config'

const pkg = require('../packages/react/package.json')
const { paths } = config

const webpackUMDConfig = (packageName: string) => ({
  target: 'web',
  mode: 'production',
  devtool: false,
  entry: {
    [pkg.name]: paths.packageSrc(packageName, 'umd.ts'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'stardust-ui-react.min.js',
    libraryTarget: 'umd',
    library: 'Stardust',
    path: paths.packageDist(packageName, 'umd'),
    publicPath: '/',
    pathinfo: true,
  },
  resolve: webpackConfig.resolve,
  module: {
    noParse: webpackConfig.module.noParse,
    rules: webpackConfig.module.rules,
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
})

export default webpackUMDConfig
