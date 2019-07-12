import { Button } from '@stardust-ui/react'

const button = `.${Button.className}`

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(button).snapshot('Clicks the first button'),
]

export default getScreenerSteps
