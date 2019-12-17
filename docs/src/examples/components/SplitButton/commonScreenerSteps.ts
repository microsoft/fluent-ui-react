import { SplitButton, MenuButton } from '@fluentui/react'

const selectors = {
  button: `.${SplitButton.className}`,
  toggleButton: `.${SplitButton.slotClassNames.toggleButton}`,
  menu: `.${MenuButton.slotClassNames.menu}`,
}

const getScreenerSteps = (): ScreenerSteps => [
  (builder, keys) =>
    builder
      .hover(selectors.button)
      .snapshot('Hovers split button')
      .click(selectors.toggleButton)
      .snapshot('Clicks on toggle button should show menu')
      .keys(selectors.menu, keys.downArrow)
      .snapshot('Navigates through menu of toggle button'),
]

export default getScreenerSteps
