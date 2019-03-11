import { Input } from '@stardust-ui/react'

const steps: ScreenerSteps = [
  steps => steps.focus(`.${Input.className} input`).snapshot('Can be focused'),
]

export default steps
