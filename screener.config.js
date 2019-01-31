const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const Steps = require('screener-runner/src/steps')

// https://github.com/screener-io/screener-runner
const screenerConfig = {
  projectRepo: 'stardust-ui/react',

  apiKey: process.env.SCREENER_API_KEY,

  tunnel: {
    host: 'localhost:8080',
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
  states: glob
    .sync('docs/src/examples/**/*.tsx', { ignore: ['**/index.tsx', '**/*.knobs.tsx'] })
    .reduce((states, examplePath) => {
      const { name: nameWithoutExtension, base: nameWithExtension, dir } = path.parse(examplePath)
      const rtl = nameWithExtension.endsWith('.rtl.tsx')
      const url = `http://localhost:8080/maximize/${_.kebabCase(nameWithoutExtension)}/${rtl}`

      states.push({
        url,
        name: nameWithExtension,
        // https://github.com/screener-io/screener-runner
        steps: fs.existsSync(`${dir}/${nameWithoutExtension}.steps.js`)
          ? getSteps(dir, nameWithoutExtension).end()
          : undefined,
      })

      return states
    }, []),
}

function getSteps(dir, nameWithoutExtension) {
  const stepTests = require(`./${dir}/${nameWithoutExtension}.steps`)
  return stepTests.reduce((stepsAcc, steps) => steps(stepsAcc), new Steps())
}

if (process.env.CI) {
  screenerConfig.baseBranch = 'master'
  screenerConfig.failureExitCode = 0
}

module.exports = screenerConfig
