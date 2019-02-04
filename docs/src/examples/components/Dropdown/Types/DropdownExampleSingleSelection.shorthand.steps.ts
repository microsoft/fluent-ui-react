import { Dropdown, Button, List } from '../../../../../../packages/react/src'

const steps = [
  steps => steps.click(`.${Dropdown.className} .${Button.className}`).snapshot('Shows list'),
  steps => steps.click(`.${List.className} li:nth-child(3)`).snapshot('Selects an element'),
  steps =>
    steps
      .click(`.${Dropdown.className} .${Button.className}`)
      .snapshot('Opens with selected element highlighted'),
  steps => steps.hover(`.${List.className} li:nth-child(2)`).snapshot('Highlights another element'),
]

export default steps
