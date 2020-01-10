import { Button } from '@fluentui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.hover(`.${Button.className}`).snapshot('Shows tooltip')],
}

export default config
