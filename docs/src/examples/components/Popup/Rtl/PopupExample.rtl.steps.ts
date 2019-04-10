import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${Button.className}`).snapshot('RTL: Shows popup')],
}

export default config
