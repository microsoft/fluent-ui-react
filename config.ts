import * as path from 'path'
import * as _ from 'lodash'

// ------------------------------------
// Environment vars
// ------------------------------------
const env = process.env.NODE_ENV || 'development'
const __DEV__ = env === 'development'
const __NOW__ = !!process.env.NOW
const __PERF__ = !!process.env.PERF
const __PROD__ = env === 'production'
const __BASENAME__ = __PROD__ && !__NOW__ ? '/fluent-ui-react/' : '/'

const __SKIP_ERRORS__ = !!process.env.SKIP_ERRORS

const envConfig = {
  env,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: __dirname,
  dir_build: 'build',
  dir_docs_dist: 'docs/dist',
  dir_docs_src: 'docs/src',
  dir_e2e: 'e2e',
  dir_e2e_src: 'e2e/server',
  dir_e2e_dist: 'e2e/dist',
  dir_packages: 'packages',
  dir_perf_dist: 'perf/dist',
  dir_perf_src: 'perf/src',
  dir_umd_dist: 'dist/umd',
  dir_ci_artifacts: 'dist/artifacts',
}

// ------------------------------------
// Paths
// ------------------------------------
const base = (...paths: string[]) => path.resolve(envConfig.path_base, ...paths)
const fromBase = (...paths: string[]) => (...subPaths: string[]) => base(...paths, ...subPaths)

const tempPaths = {
  build: fromBase(envConfig.dir_build),
  docsDist: fromBase(envConfig.dir_docs_dist),
  docsSrc: fromBase(envConfig.dir_docs_src),
  e2e: fromBase(envConfig.dir_e2e),
  e2eSrc: fromBase(envConfig.dir_e2e_src),
  e2eDist: fromBase(envConfig.dir_e2e_dist),
  packageDist: (packageName: string, ...paths: string[]) =>
    base(envConfig.dir_packages, packageName, 'dist', ...paths),
  packageSrc: (packageName: string, ...paths: string[]) =>
    base(envConfig.dir_packages, packageName, 'src', ...paths),
  packages: fromBase(envConfig.dir_packages),
  perfDist: fromBase(envConfig.dir_perf_dist),
  perfSrc: fromBase(envConfig.dir_perf_src),
  umdDist: fromBase(envConfig.dir_umd_dist),
  ciArtifacts: fromBase(envConfig.dir_ci_artifacts),
  withRootAt: (root: string, ...subpaths: string[]) => (...args: string[]) =>
    path.resolve(root, ...subpaths, ...args),
}

const paths = {
  base,
  ...tempPaths,
  // all the sibling values, but with forward slashes regardless the OS
  posix: _.mapValues(tempPaths, (func: (...args: string[]) => string) => (...args: string[]) =>
    func(...args).replace(/\\/g, '/'),
  ),
}

const config = {
  ...envConfig,
  paths,

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: Number(process.env.PORT) || 8080,
  perf_port: Number(process.env.PERF_PORT) || 8081,
  e2e_port: Number(process.env.E2E_PORT) || 8082,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: __DEV__ && 'eval-source-map',
  compiler_mode: __DEV__ ? 'development' : 'production',
  compiler_globals: {
    __DEV__,
    __PERF__,
    __PROD__,
    __BASENAME__: JSON.stringify(__BASENAME__),
    __SKIP_ERRORS__,
    'process.env': {
      NODE_ENV: JSON.stringify(env),
      SCREENER: !!process.env.SCREENER_API_KEY,
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
    assets: false, // assets info
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
}

export default config
