import { Alert } from '@stardust-ui/react'

const alertActionButton = `.${Alert.slotClassNames.action}`

const getScreenerSteps = (): ScreenerSteps => [
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses the action button'),
  builder => builder.hover(alertActionButton).snapshot('Hovers the action button'),
]

export default getScreenerSteps
