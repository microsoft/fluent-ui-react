import getScreenerSteps from '../commonScreenerSteps'

export const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getScreenerSteps(),
}

export default config
