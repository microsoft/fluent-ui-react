import { Dropdown, List, Indicator, Input, Label } from '../../../../../../packages/react/src'
import * as Keys from 'screener-runner/src/keys'

const steps = [
  steps =>
    steps
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .click(`.${Dropdown.className} .${Indicator.className}`)
      .click(`.${List.className} li:nth-child(2)`)
      .keys(`.${Input.slotClassNames.input}`, Keys.leftArrow)
      .snapshot('Selects last selected element'),
  steps =>
    steps
      .hover(`.${Dropdown.slotClassNames.selectedItems} .${Label.className}:nth-child(1)`)
      .snapshot('Hovers first selected element'),
]

export default steps
