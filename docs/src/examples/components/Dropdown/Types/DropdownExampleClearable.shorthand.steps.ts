import { Dropdown } from '@stardust-ui/react'

const selectors = {
  clearIndicator: `.${Dropdown.slotClassNames.clearIndicator}`,
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps = [
  steps => steps.click(selectors.triggerButton).snapshot('Shows list'),
  steps => steps.click(selectors.item(3)).snapshot('Selects an item'),
  steps => steps.click(selectors.clearIndicator).snapshot('Clears the value'),
  steps => steps.click(selectors.triggerButton).snapshot('Closes the list'),
]

export default steps
