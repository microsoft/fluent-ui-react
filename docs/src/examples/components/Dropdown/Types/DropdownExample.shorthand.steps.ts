import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const config: ScreenerTestsConfig = {
  steps: [
    sb => sb.click(selectors.triggerButton).snapshot('Shows list'),
    sb =>
      sb
        .click(selectors.triggerButton)
        .click(selectors.item(3))
        .snapshot('Selects an item')
        .click(selectors.triggerButton)
        .snapshot('Opens with selected item highlighted')
        .hover(selectors.item(2))
        .snapshot('Highlights another item')
        .click(selectors.triggerButton)
        .snapshot('Closes the list'),
  ],
}

export default config
