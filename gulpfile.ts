import { task, series, parallel } from 'gulp'
import * as path from 'path'

// add node_modules/.bin to the path so we can invoke .bin CLIs in tasks
process.env.PATH =
  process.env.PATH + path.delimiter + path.resolve(__dirname, 'node_modules', '.bin')

// load tasks in order of dependency usage
require('./build/gulp/tasks/dll')
require('./build/gulp/tasks/dist')
require('./build/gulp/tasks/docs')
require('./build/gulp/tasks/generate')
require('./build/gulp/tasks/screener')
require('./build/gulp/tasks/stats')
require('./build/gulp/tasks/git')
require('./build/gulp/tasks/test-unit')
require('./build/gulp/tasks/test-projects')
require('./build/gulp/tasks/perf')
require('./build/gulp/tasks/test-vulns')

// global tasks
task('build', series('dll', parallel('dist', 'build:docs')))
