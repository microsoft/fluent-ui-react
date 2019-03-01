require('ts-node').register()

const chalk = require('chalk')
const _ = require('lodash')
const glob = require('glob')
const minimatch = require('minimatch')
const path = require('path')
const fs = require('fs')
const tsPaths = require('tsconfig-paths')
const Keys = require('screener-runner/src/keys')
const Steps = require('screener-runner/src/steps')

const { default: config } = require('./config')
const { compilerOptions } = require('./build/tsconfig.common.json')

tsPaths.register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths,
})

const SCREENER_HOST_URL = `${config.server_host}:${config.server_port}`

const examplePaths = glob.sync('docs/src/examples/**/*.tsx', {
  ignore: ['**/index.tsx', '**/*.knobs.tsx'],
})
const pathFilter = process.env.SCREENER_FILTER
const filteredPaths = minimatch.match(examplePaths, pathFilter || '*', { matchBase: true })

if (pathFilter) {
  console.log(chalk.bgGreen.black(' --filter '), pathFilter)
  filteredPaths.forEach(filteredPath => console.log(`${_.repeat(' ', 10)} ${filteredPath}`))
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
    const {
      name: exampleNameWithoutExtension,
      base: exampleNameWithExtension,
      dir: exampleDir,
    } = path.parse(examplePath)

    const rtl = exampleNameWithExtension.endsWith('.rtl.tsx')
    const exampleUrl = _.kebabCase(exampleNameWithoutExtension)

    states.push({
      url: `http://${SCREENER_HOST_URL}/maximize/${exampleUrl}/${rtl}`,
      name: exampleNameWithExtension,

      // https://www.npmjs.com/package/screener-runner#testing-interactions
      steps: getSteps(exampleDir, exampleNameWithoutExtension),
    })

    return states
  }, []),
}

function getSteps(dir, nameWithoutExtension) {
  const stepsSpecModulePath = `${dir}/${nameWithoutExtension}.steps.ts`

  if (fs.existsSync(stepsSpecModulePath)) {
    const stepsDefinition = require(`./${dir}/${nameWithoutExtension}.steps`).default

    return stepsDefinition
      .reduce((stepsAcc, steps) => {
        return steps(stepsAcc, Keys).executeScript(`window.resetExternalLayout()`)
      }, new Steps())
      .end()
  }
}

if (process.env.CI) {
  screenerConfig.baseBranch = 'master'
  screenerConfig.failureExitCode = 0
}

module.exports = screenerConfig
