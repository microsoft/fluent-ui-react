import { Checkbox } from '@stardust-ui/react'

export const config: ScreenerTestsConfig = {
  themes: ['base', 'teams'],
  steps: [builder => builder.click(`.${Checkbox.className}`).snapshot('Can be checked')],
}

export default config
