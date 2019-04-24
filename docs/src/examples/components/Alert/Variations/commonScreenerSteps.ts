import { Alert } from '@stardust-ui/react'

const alert = `.${Alert.className}`
// const alertActionButton = `.${Alert.slotClassNames.action}`

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(alert).snapshot('Hovers the action icon'),
  (builder, keys) =>
    builder
      .click(alert)
      .keys(alert, keys.tab)
      .snapshot('Focuses the action icon'),
]

export default getScreenerSteps
