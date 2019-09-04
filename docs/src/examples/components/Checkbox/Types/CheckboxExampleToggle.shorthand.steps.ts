import getScreenerSteps from '../commonScreenerSteps'

export const config: ScreenerTestsConfig = {
  themes: ['base', 'teams'],
  steps: getScreenerSteps(),
}

export default config
