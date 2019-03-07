import { Menu } from '@stardust-ui/react'
import { applyCommonThemesBeforeStep } from '../../screenerStepsUtils'

interface StepsOptions {
  vertical?: boolean
}

const selectors = {
  menu: `.${Menu.className}`,
  item: (itemIndex: number) => `.${Menu.className} li:nth-child(${itemIndex}) a`,
}

const getCommonStep = ({ vertical }: StepsOptions = {}): ScreenerStep => (steps, keys) =>
  steps
    .hover(selectors.item(2))
    .snapshot('Hovers 2nd item (hover state styles)')
    .click(selectors.item(2))
    .snapshot('Clicks on 2nd item (active state styles)')
    .keys(selectors.item(2), vertical ? keys.downArrow : keys.rightArrow)
    .snapshot('Navigates to next item (focus state styles)')
    .keys(selectors.item(3), vertical ? keys.upArrow : keys.leftArrow)
    .snapshot('Navigates to previous item (active and focus state styles)')

export const getScreenerSteps = (options: StepsOptions = {}): ScreenerSteps => [
  getCommonStep(options),
]

export const getScreenerStepsForCommonThemes = (options: StepsOptions = {}): ScreenerSteps =>
  applyCommonThemesBeforeStep(getCommonStep(options))
