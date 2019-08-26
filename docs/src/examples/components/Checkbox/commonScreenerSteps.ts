import { Checkbox } from '@stardust-ui/react'

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(`.${Checkbox.className}`).snapshot('Can be checked'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Can be focused'),
]

export default getScreenerSteps
