import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  dropdownItem: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps = [
  steps => steps.click(selectors.triggerButton).snapshot('Shows list'),
  steps => steps.click(selectors.dropdownItem(3)).snapshot('Selects an item'),
  steps => steps.click(selectors.triggerButton).snapshot('Opens with selected item highlighted'),
  steps => steps.hover(selectors.dropdownItem(2)).snapshot('Highlights another item'),
  steps => steps.click(selectors.triggerButton).snapshot('Closes the list'),
]

export default steps
