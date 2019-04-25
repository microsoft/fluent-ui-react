import { Alert } from '@stardust-ui/react'

const alertActionButton = `.${Alert.slotClassNames.action}`

const getFocusScreenerSteps = (): ScreenerSteps => [
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses the action button'),
]

const getHoverScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(alertActionButton).snapshot('Hovers the action button'),
]

export { getFocusScreenerSteps, getHoverScreenerSteps }
