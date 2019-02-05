import { Dropdown, DropdownSelectedItem } from '../../../../../../packages/react/src'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  dropdownItem: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  dropdownSelectedItemRemoveIcon: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.selectedItems} span:nth-child(${itemIndex}) .${
      DropdownSelectedItem.slotClassNames.removeIcon
    }`,
}

const toggle = steps => steps.click(selectors.triggerButton)

const steps = [
  steps => toggle(steps).snapshot('Shows list'),
  steps => steps.click(selectors.dropdownItem(3)).snapshot('Selects an item'),
  steps =>
    toggle(steps)
      .hover(selectors.dropdownItem(2))
      .snapshot('Oepns and highlights an item'),
  steps => steps.click(selectors.dropdownItem(2)).snapshot('Selects another item'),
  steps => toggle(steps).snapshot('Reopens list'),
  steps =>
    steps
      .click(selectors.dropdownSelectedItemRemoveIcon())
      .snapshot('Removes a selected item and sees it in the list'),
  steps =>
    steps
      .click(selectors.dropdownSelectedItemRemoveIcon())
      .snapshot('Removes the last item, sees placeholder and sees the initial list'),
  steps => toggle(steps).snapshot('Closes the list'),
]

export default steps
