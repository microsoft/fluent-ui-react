import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.hover(`.${Button.className}`).snapshot('Shows tooltip'),
    builder => builder.hover('document.body'),
  ],
}

export default config
