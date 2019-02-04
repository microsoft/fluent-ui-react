import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  dropdownItem: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const toggle = steps => steps.click(selectors.triggerButton)

const steps = [
  steps => toggle(steps).snapshot('Shows list'),
  steps => steps.click(selectors.dropdownItem(3)).snapshot('Selects an item'),
  steps => toggle(steps).snapshot('Opens with selected item highlighted'),
  steps => steps.hover(selectors.dropdownItem(2)).snapshot('Highlights another item'),
  steps => toggle(steps).snapshot('Closes the list'),
]

export default steps
