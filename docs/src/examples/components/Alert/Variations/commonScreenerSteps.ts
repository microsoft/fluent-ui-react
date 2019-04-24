import { Alert } from '@stardust-ui/react'

const alertActionButton = `.${Alert.slotClassNames.action}`

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(alertActionButton).snapshot('Hovers the action icon'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses the action icon'),
]

export default getScreenerSteps
