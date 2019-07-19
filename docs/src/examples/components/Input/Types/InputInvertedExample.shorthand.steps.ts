import { Input } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.focus(`.${Input.className} input`).snapshot('Inverted input can be focused'),
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
}

export default config
