import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.focus(`.${Button.className}`).snapshot('Shows plain tooltip'),
    builder =>
      builder.focus(`.${Button.className}:nth-of-type(2)`).snapshot('Shows wrapper tooltip'),
  ],
}

export default config
