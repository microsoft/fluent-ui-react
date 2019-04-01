import * as path from 'path'
import * as _ from 'lodash'

// ------------------------------------
// Environment vars
// ------------------------------------
const env = process.env.NODE_ENV || 'development'
const __DEV__ = env === 'development'
const __PERF__ = !!process.env.PERF
const __PROD__ = env === 'production'
const __BASENAME__ = __PROD__ ? '/react/' : '/'

const envConfig = {
  env,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: __dirname,
  dir_dll: 'dll',
  dir_docs_dist: 'docs/dist',
  dir_docs_src: 'docs/src',
  dir_packages: 'packages',
  dir_perf_dist: 'perf/dist',
  dir_perf_src: 'perf/src',
  dir_umd_dist: 'dist/umd',
}

// ------------------------------------
// Paths
// ------------------------------------
const base = (...args) => path.resolve(...[envConfig.path_base, ...args])

const paths = {
  base,
  dll: base.bind(null, envConfig.dir_dll),
  docsDist: base.bind(null, envConfig.dir_docs_dist),
  docsSrc: base.bind(null, envConfig.dir_docs_src),
  packageDist: (packageName: string, ...paths: string[]) =>
    base(envConfig.dir_packages, packageName, 'dist', ...paths),
  packageSrc: (packageName: string, ...paths: string[]) =>
    base(envConfig.dir_packages, packageName, 'src', ...paths),
  packages: base.bind(null, envConfig.dir_packages),
  perfDist: base.bind(null, envConfig.dir_perf_dist),
  perfSrc: base.bind(null, envConfig.dir_perf_src),
  umdDist: base.bind(null, envConfig.dir_umd_dist),
  withRootAt: (root, ...subpaths) => (...args) => path.resolve(root, ...subpaths, ...args),
  posix: undefined, // all the sibling values, but with forward slashes regardless the OS
}

paths.posix = _.mapValues(paths, func => (...args) => func(...args).replace(/\\/g, '/'))

const config = {
  ...envConfig,
  paths,

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: Number(process.env.PORT) || 8080,
  perf_port: Number(process.env.PERF_PORT) || 8081,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: __DEV__ && 'eval-source-map',
  compiler_globals: {
    __DEV__,
    __PERF__,
    __PROD__,
    __BASENAME__: JSON.stringify(__BASENAME__),
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
    __PATH_SEP__: JSON.stringify(path.sep),
  },
  compiler_hash_type: __PROD__ ? 'chunkhash' : 'hash',
  compiler_output_path: paths.base(envConfig.dir_docs_dist),
  compiler_public_path: __BASENAME__,
  compiler_stats: {
    hash: false, // the hash of the compilation
    version: false, // webpack version info
    timings: true, // timing info
    assets: true, // assets info
    chunks: false, // chunk info
    colors: true, // with console colors
    chunkModules: false, // built modules info to chunk info
    modules: false, // built modules info
    cached: false, // also info about cached (not built) modules
    reasons: false, // info about the reasons modules are included
    source: false, // the source code of modules
    errorDetails: true, // details to errors (like resolving log)
    chunkOrigins: false, // the origins of chunks and chunk merging info
    modulesSort: '', // (string) sort the modules by that field
    chunksSort: '', // (string) sort the chunks by that field
    assetsSort: '', // (string) sort the assets by that field
  },
  compiler_vendor: [
    'brace',
    'brace/ext/language_tools',
    'brace/mode/jsx',
    'brace/mode/html',
    'brace/theme/tomorrow',
    'classnames',
    'copy-to-clipboard',
    'react-ace',
  ],
}

export default config
