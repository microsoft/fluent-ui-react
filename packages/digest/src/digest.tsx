import webpack from 'webpack'

import defaultConfig from './webpack.config'

export interface DigestConfig {
  configDir: string
  outputDir: string
}

// TODO:
// support for addons and decorators (ThemeProvider)
// support for setup (like initializeIcons.) is this an addon?
// use / merge webpack configs (always apply default by default or leave to user?)
// use config function and push rules like storybook?
// bundle react? peer dep? leave up to user? (this package shouldn't even care if react is used)
export async function digestStories(consumerConfig: DigestConfig) {
  console.log('Bundling digest..')

  // TODO: use a real merge
  let webpackConfig = defaultConfig

  // TODO: should also allow user webpack config in DigestConfig that overwrites anything here.
  webpackConfig = {
    ...defaultConfig,
    output: {
      ...defaultConfig.output,
      ...{ path: consumerConfig.outputDir },
    },
    resolve: {
      ...defaultConfig.resolve,
      alias: {
        ...defaultConfig.resolve.alias,
        ...{ stories: consumerConfig.configDir },
      },
    },
  }

  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        console.error('Failed to create bundle.')

        if (error) {
          console.error(error.message)
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          const { warnings, errors } = stats.toJson()

          errors.forEach(e => console.error(e))
          warnings.forEach(e => console.error(e))
        }

        process.exitCode = 1
        reject(error || stats)
        return
      }

      stats.toJson().warnings.forEach(e => console.warn(e))

      resolve(stats)
    })
  })
}

// URL construction based on implementation in index.digest.tsx
export function generateUrl(baseUrl: string, kind: string, story: string, iterations?: number) {
  return `${baseUrl}?selectedKind=${kind}&selectedStory=${story}${
    iterations ? `&iterations=${iterations}` : ''
  }`
}
