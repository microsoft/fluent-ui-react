import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.hover(`.${Button.className}`).snapshot('Shows tooltip'),
    builder => builder.hover('body'), // we need the mouse to be moved out of the button for the next test
  ],
}

export default config
