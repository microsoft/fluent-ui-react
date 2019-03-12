import { Input } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [sb => sb.focus(`.${Input.className} input`).snapshot('Can be focused')],
}

export default config
