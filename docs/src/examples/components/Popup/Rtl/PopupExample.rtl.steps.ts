import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [sb => sb.click(`.${Button.className}`).snapshot('RTL: Shows popup')],
}

export default config
