import { Menu } from '@stardust-ui/react'
import getScreenerSteps from '../commonScreenerSteps'

const selectors = {
  menu: `.${Menu.className}`,
  item: (itemIndex: number) => `.${Menu.className} li:nth-child(${itemIndex}) a`,
  lastItem: `.${Menu.className} li:last-child a`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      getScreenerSteps({ startIdx: 2, endIdx: 4 })[0](builder, keys)
        .click(selectors.lastItem)
        .snapshot('Clicks on the last item and opens submenu')

        .keys(selectors.lastItem, keys.downArrow)
        .snapshot('Focuses on the first element in the submenu'),
  ],
}

export default config
