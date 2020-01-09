import { task, parallel } from 'gulp'
import * as path from 'path'
import * as tsPaths from 'tsconfig-paths'

import config from './build/config'

const { compilerOptions } = require('./build/tsconfig.docs.json')

// add node_modules/.bin to the path so we can invoke .bin CLIs in tasks
process.env.PATH =
  process.env.PATH + path.delimiter + path.resolve(__dirname, 'node_modules', '.bin')

tsPaths.register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths,
})

// load tasks in order of dependency usage
require('./build/gulp/tasks/bundle')
require('./build/gulp/tasks/docs')
require('./build/gulp/tasks/screener')
require('./build/gulp/tasks/stats')
require('./build/gulp/tasks/test-unit')
require('./build/gulp/tasks/test-projects')
require('./build/gulp/tasks/perf')
require('./build/gulp/tasks/test-e2e')
require('./build/gulp/tasks/test-circulars')
require('./build/gulp/tasks/test-dependencies')

// global tasks
task('build', parallel('bundle:all-packages', 'build:docs'))
