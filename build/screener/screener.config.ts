import chalk from 'chalk'
import * as _ from 'lodash'
import * as glob from 'glob'
import * as minimatch from 'minimatch'
import * as path from 'path'
import * as tsPaths from 'tsconfig-paths'

import getScreenerSteps from './screener.steps'
import config from '../../config'
const { compilerOptions } = require('../../build/tsconfig.common.json')

tsPaths.register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths,
})

const SCREENER_HOST_URL = `${config.server_host}:${config.server_port}`

const examplePaths = glob.sync('docs/src/examples/**/*.tsx', {
  ignore: ['**/index.tsx', '**/*.knobs.tsx'],
})
const pathFilter = process.env.SCREENER_FILTER
const filteredPaths: string[] = minimatch.match(examplePaths, pathFilter || '*', {
  matchBase: true,
})

if (pathFilter) {
  console.log(chalk.bgGreen.black(' --filter '), pathFilter)
  filteredPaths.forEach(filteredPath => console.log(`${_.repeat(' ', 10)} ${filteredPath}`))
}

const getStateForPath = (examplePath: string) => {
  const {
    name: exampleNameWithoutExtension,
    base: exampleNameWithExtension,
    dir: exampleDir,
  } = path.parse(examplePath)

  const rtl = exampleNameWithExtension.endsWith('.rtl.tsx')
  const exampleUrl = _.kebabCase(exampleNameWithoutExtension)

  return {
    url: `http://${SCREENER_HOST_URL}/maximize/${exampleUrl}/${rtl}`,
    name: exampleNameWithExtension,

    // https://www.npmjs.com/package/screener-runner#testing-interactions
    steps: getScreenerSteps(`${exampleDir}/${exampleNameWithoutExtension}.steps`),
  }
}

// https://github.com/screener-io/screener-runner
const screenerConfig = {
  projectRepo: 'stardust-ui/react',

  apiKey: process.env.SCREENER_API_KEY,

  tunnel: {
    host: `${SCREENER_HOST_URL}`,
    gzip: true, // gzip compress all content being served from tunnel host
    cache: true, // sets cache-control header for all content being served from tunnel host. Must be used with gzip option
  },

  diffOptions: {
    structure: true,
    layout: true,
    style: true,
    content: true,
    minLayoutPosition: 1, // Optional threshold for Layout changes. Defaults to 4 pixels.
    minLayoutDimension: 1, // Optional threshold for Layout changes. Defaults to 10 pixels.
    minShiftGraphic: 1, // Optional threshold for pixel shifts in graphics.
    compareSVGDOM: false, // Pass if SVG DOM is the same. Defaults to false.
  },

  // screenshot every example in maximized mode
  states: filteredPaths.reduce((states, examplePath) => {
    states.push(getStateForPath(examplePath))
    return states
  }, []),

  ...(process.env.CI && {
    baseBranch: 'master',
    failureExitCode: 0,
  }),
}

export default screenerConfig
