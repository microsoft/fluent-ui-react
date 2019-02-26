import { Dropdown, DropdownSearchInput } from '@stardust-ui/react'

const selectors = {
  indicator: `.${Dropdown.slotClassNames.indicator}`,
  input: `.${DropdownSearchInput.slotClassNames.input}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
  selectedItem: (itemIndex: number) =>
    `.${Dropdown.slotClassNames.selectedItems} span:nth-child(${itemIndex})`,
}

const steps: ScreenerSteps = [
  (steps, keys) =>
    steps
      .click(selectors.indicator)
      .click(selectors.item(2))
      .click(selectors.indicator)
      .click(selectors.item(2))
      .keys(selectors.input, keys.leftArrow)
      .snapshot('Selects last selected element'),
  steps => steps.hover(selectors.selectedItem(1)).snapshot('Hovers first selected element'),
]

export default steps
