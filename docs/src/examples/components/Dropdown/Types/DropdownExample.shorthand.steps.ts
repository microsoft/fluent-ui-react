import { Dropdown } from '@stardust-ui/react'
import { applyCommonThemesBeforeStep } from '../../../screenerStepsUtils'

const selectors = {
  triggerButton: `.${Dropdown.slotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${Dropdown.slotClassNames.itemsList} li:nth-child(${itemIndex})`,
}

const steps: ScreenerSteps = [
  steps => steps.click(selectors.triggerButton).snapshot('Shows list'),
  ...applyCommonThemesBeforeStep(steps =>
    steps
      .click(selectors.triggerButton)
      .click(selectors.item(3))
      .snapshot('Selects an item')
      .click(selectors.triggerButton)
      .snapshot('Opens with selected item highlighted')
      .hover(selectors.item(2))
      .snapshot('Highlights another item')
      .click(selectors.triggerButton)
      .snapshot('Closes the list'),
  ),
]

export default steps
