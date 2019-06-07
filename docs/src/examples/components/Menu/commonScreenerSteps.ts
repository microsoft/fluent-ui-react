import { Menu } from '@stardust-ui/react'

interface StepsOptions {
  vertical?: boolean
  startIdx?: number
  endIdx?: number
}

const selectors = {
  menu: `.${Menu.className}`,
  item: (itemIndex: number) => `.${Menu.className} li:nth-child(${itemIndex}) a`,
}

const getScreenerSteps = (
  { vertical, startIdx, endIdx }: StepsOptions = { startIdx: 2, endIdx: 3 },
): ScreenerSteps => [
  (builder, keys) =>
    builder
      .hover(selectors.item(startIdx))
      .snapshot('Hovers 2nd item (hover state styles)')
      .click(selectors.item(startIdx))
      .snapshot('Clicks on 2nd item (active state styles)')
      .keys(selectors.item(startIdx), vertical ? keys.downArrow : keys.rightArrow)
      .snapshot('Navigates to next item (focus state styles)')
      .keys(selectors.item(endIdx), vertical ? keys.upArrow : keys.leftArrow)
      .snapshot('Navigates to previous item (active and focus state styles)'),
]

export default getScreenerSteps
