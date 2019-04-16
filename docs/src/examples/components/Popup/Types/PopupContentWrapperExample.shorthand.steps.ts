import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(`.${Button.className}`).snapshot('Shows plain popup'),
    builder => builder.click(`.${Button.className}:nth-of-type(2)`).snapshot('Shows wrapper popup'),
  ],
}

export default config
