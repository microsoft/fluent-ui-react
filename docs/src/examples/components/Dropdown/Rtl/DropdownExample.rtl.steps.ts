import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps: ScreenerSteps = [
  steps =>
    steps
      .click(selectors.triggerButton)
      .snapshot('RTL: Shows list')
      .click(selectors.item(3))
      .snapshot('RTL: Selects an item'),
]

export default steps
