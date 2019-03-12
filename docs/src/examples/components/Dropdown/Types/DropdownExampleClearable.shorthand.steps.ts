import { Dropdown } from '@stardust-ui/react'

const selectors = {
  clearIndicator: `.${Dropdown.slotClassNames.clearIndicator}`,
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps: ScreenerSteps = [
  steps =>
    steps
      .click(selectors.triggerButton)
      .click(selectors.item(3))
      .snapshot('Selects an item')
      .click(selectors.clearIndicator)
      .snapshot('Clears the value'),
]

export default steps
