import { Dropdown, List, Indicator, Input, Label } from '@stardust-ui/react'

const steps: ScreenerSteps = [
  (steps, keys) =>
    steps
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .keys(`.${Input.slotClassNames.input}`, keys.leftArrow)
      .snapshot('Selects last selected element'),
  (steps, keys) =>
    steps
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .keys(`.${Input.slotClassNames.input}`, keys.leftArrow)
      .hover(`.${Dropdown.slotClassNames.selectedItems} .${Label.className}:nth-child(1)`)
      .snapshot('Hovers first selected element'),
]

export default steps
