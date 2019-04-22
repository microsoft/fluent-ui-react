import { Input } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${Input.className} input`).snapshot('Can be focused')],
  themes: ['teams', 'base'],
}

export default config
