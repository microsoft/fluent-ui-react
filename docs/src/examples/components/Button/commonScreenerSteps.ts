import { Button } from '@stardust-ui/react'

const button = `.${Button.className}`

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(button).snapshot('Hover state of the first button'),
  builder => builder.click(button).snapshot('Active state of the first button (click)'),
  (builder, keys) => builder.keys(button, keys.tab).snapshot('Focus state of the second button'),
]

export default getScreenerSteps
