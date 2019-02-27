import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps = [
  steps => steps.click(selectors.triggerButton).snapshot('Shows list'),
  steps => steps.click(selectors.item(3)).snapshot('Selects an item'),
  steps =>
    steps
      .click(selectors.item(3))
      .click(selectors.triggerButton)
      .snapshot('Opens with selected item highlighted'),
  steps =>
    steps
      .click(selectors.item(3))
      .click(selectors.triggerButton)
      .hover(selectors.item(2))
      .snapshot('Highlights another item'),
  steps =>
    steps
      .click(selectors.triggerButton)
      .click(selectors.item(3))
      .click(selectors.triggerButton)
      .snapshot('Closes the list'),
]

export default steps
