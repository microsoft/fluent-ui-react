import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(`.${Button.className}`).snapshot('RTL: Shows tooltip')],
}

export default config
