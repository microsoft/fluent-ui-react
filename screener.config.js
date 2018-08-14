const _ = require('lodash')
const glob = require('glob')
const path = require('path')

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
    .map(examplePath => {
      const { name: nameWithoutExtension, base: nameWithExtension } = path.parse(examplePath)

      return {
        url: `http://localhost:8080/maximize/${_.kebabCase(nameWithoutExtension)}`,
        name: nameWithExtension,
      }
    }),
}

if (process.env.CI) {
  screenerConfig.baseBranch = 'master'
  screenerConfig.failureExitCode = 0
}

module.exports = screenerConfig
