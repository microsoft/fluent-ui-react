import { Alert } from '@stardust-ui/react'

const alert = `.${Alert.className}`
const alertActionButton = `.${Alert.slotClassNames.action}`

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(alertActionButton).snapshot('Hovers the action icon'),
  builder => builder.focus(alert).snapshot('Focuses the action icon'),
]

export default getScreenerSteps
