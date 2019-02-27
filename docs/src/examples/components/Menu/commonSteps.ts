import { Menu } from '@stardust-ui/react'
import { ScreenerStepsArray } from 'docs/src/types'

interface StepsOptions {
  vertical?: boolean
}

const menuSelector = `.${Menu.className}`
const selectors = {
  menu: menuSelector,
  item: (itemIndex: number) => `${menuSelector} li:nth-child(${itemIndex}) a`,
}

const commonSteps: ScreenerStepsArray = [
  steps => steps.hover(selectors.item(2)).snapshot('Hovers 2nd item (hover state styles)'),
  steps => steps.click(selectors.item(2)).snapshot('Clicks on 2nd item (active state styles)'),
]

const getSteps = ({ vertical }: StepsOptions = {}): ScreenerStepsArray => [
  ...commonSteps,
  (steps, keys) =>
    steps
      .keys(selectors.item(2), vertical ? keys.downArrow : keys.rightArrow)
      .snapshot('Navigates to next item (focus state styles)'),
  (steps, keys) =>
    steps
      .keys(selectors.item(3), vertical ? keys.upArrow : keys.leftArrow)
      .snapshot('Navigates to previous item (active and focus state styles)'),
]

export default getSteps
