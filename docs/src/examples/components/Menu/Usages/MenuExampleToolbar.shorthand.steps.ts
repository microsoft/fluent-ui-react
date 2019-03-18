import { Menu } from '@stardust-ui/react'

interface StepsOptions {
  vertical?: boolean
}

const selectors = {
  menu: `.${Menu.className}`,
  item: (itemIndex: number) => `.${Menu.className} li:nth-child(${itemIndex}) a`,
  lastItem: `.${Menu.className} li:last-child a`,
}

const getScreenerSteps = ({ vertical }: StepsOptions = {}): ScreenerSteps => [
  (builder, keys) =>
    builder
      .hover(selectors.item(2))
      .snapshot('Hovers 2nd item (hover state styles)')

      .click(selectors.item(2))
      .snapshot('Clicks on 2nd item (active state styles)')

      .keys(selectors.item(2), vertical ? keys.downArrow : keys.rightArrow)
      .snapshot('Navigates to next item (focus state styles)')

      .keys(selectors.item(3), vertical ? keys.upArrow : keys.leftArrow)
      .snapshot('Navigates to previous item (active and focus state styles)')

      .click(selectors.lastItem)
      .snapshot('Clicks on the last item and opens submenu')

      .keys(selectors.lastItem, keys.downArrow)
      .snapshot('Focuses on the first element in the submenu'),
]

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getScreenerSteps(),
}

export default config
