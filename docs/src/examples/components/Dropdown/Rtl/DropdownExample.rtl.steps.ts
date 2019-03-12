import { Dropdown } from '@stardust-ui/react'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

export const config: ScreenerTestsConfig = {
  steps: [
    sb =>
      sb
        .click(selectors.triggerButton)
        .snapshot('RTL: Shows list')
        .click(selectors.item(3))
        .snapshot('RTL: Selects an item'),
  ],
}

export default config
