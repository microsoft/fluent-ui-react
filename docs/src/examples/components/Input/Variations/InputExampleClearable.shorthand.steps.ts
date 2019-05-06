import { Input } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder.setValue(`.${Input.className} input`, 'Some text...').snapshot('Can be clearable'),
  ],
  themes: ['teams', 'base'],
}

export default config
