import getScreenerSteps from '../commonScreenerSteps'

export const config: ScreenerTestsConfig = {
  themes: ['teams'],
  steps: getScreenerSteps(),
}

export default config
