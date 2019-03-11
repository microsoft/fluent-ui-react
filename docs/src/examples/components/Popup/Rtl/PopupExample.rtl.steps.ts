import { Button } from '@stardust-ui/react'

const steps: ScreenerSteps = [
  steps => steps.click(`.${Button.className}`).snapshot('RTL: Shows popup'),
]

export default steps
