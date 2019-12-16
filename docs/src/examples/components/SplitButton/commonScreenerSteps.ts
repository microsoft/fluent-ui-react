import { SplitButton } from '@fluentui/react'

const selectors = {
  button: `.${SplitButton.className}`,
  toggleButton: `.${SplitButton.slotClassNames.toggleButton}`,
}

const getScreenerSteps = (): ScreenerSteps => [
  (builder, keys) =>
    builder
      .hover(selectors.button)
      .snapshot('Hovers split button')
      .click(selectors.toggleButton)
      .snapshot('Clicks on toggle button should show menu')
      .keys(selectors.toggleButton, keys.downArrow)
      .keys(selectors.toggleButton, keys.downArrow)
      .snapshot('Navigates through menu of toggle button'),
]

export default getScreenerSteps
