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
  path_base: path.resolve(__dirname, '..'),
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

const isRoot = process.cwd() === envConfig.path_base
let packageName = isRoot ? 'react' : path.basename(process.cwd())
// don't use yargs here because it causes build errors in certain circumstances
const packageArgIndex = process.argv.indexOf('--package')
if (packageArgIndex > -1 && process.argv[packageArgIndex + 1]) {
  packageName = process.argv[packageArgIndex + 1]
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
    /** the hash of the compilation */
    hash: false,
    /** webpack version info */
    version: false,
    /** timing info */
    timings: true,
    /** assets info */
    assets: false,
    /** chunk info */
    chunks: false,
    /** with console colors */
    colors: true,
    /** built modules info to chunk info */
    chunkModules: false,
    /** built modules info */
    modules: false,
    /** also info about cached (not built) modules */
    cached: false,
    /** info about the reasons modules are included */
    reasons: false,
    /** the source code of modules */
    source: false,
    /** details to errors (like resolving log) */
    errorDetails: true,
    /** the origins of chunks and chunk merging info */
    chunkOrigins: false,
    /** sort the modules by that field */
    modulesSort: '',
    /** sort the chunks by that field */
    chunksSort: '',
    /** sort the assets by that field */
    assetsSort: '',
  },

  /** True if command is running from repo root */
  isRoot,
  /** Package name the task is running against: default to react if running at root, or cwd otherwise */
  package: packageName,
}

export default config
