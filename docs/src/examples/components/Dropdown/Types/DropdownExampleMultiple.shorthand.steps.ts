import { Dropdown, DropdownSelectedItem } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  dropdownItem: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  dropdownSelectedItemRemoveIcon: (itemIndex = 1) =>
    `.${Dropdown.slotClassNames.selectedItems} span:nth-child(${itemIndex}) .${
      DropdownSelectedItem.slotClassNames.removeIcon
    }`,
}

const steps = [
  steps =>
    steps
      .click(selectors.triggerButton)
      .click(selectors.dropdownItem(3))
      .click(selectors.triggerButton)
      .click(selectors.dropdownItem(2))
      .click(selectors.triggerButton)
      .snapshot('Selects 2 items and opens list'),
  steps =>
    steps
      .click(selectors.dropdownSelectedItemRemoveIcon())
      .click(selectors.triggerButton)
      .click(selectors.dropdownSelectedItemRemoveIcon())
      .click(selectors.triggerButton)
      .snapshot('Removes the 2 items and sees the initial list'),
]

export default steps
