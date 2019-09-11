import { TreeItem, TreeTitle } from '@stardust-ui/react'

const selectors = {
  treeItem: (itemIndex: number) => `.${TreeItem.className}:nth-of-type(${itemIndex})`,
  treeTitle: (itemIndex: number) =>
    `.${TreeItem.className}:nth-of-type(${itemIndex}) .${TreeTitle.className}`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.treeTitle(1))
        .click(selectors.treeTitle(2))
        .snapshot('Focus on click subtree')
        .keys(selectors.treeItem(2), keys.downArrow)
        .snapshot('Focus on keyboard leaf')
        .click(selectors.treeTitle(5))
        .snapshot('Focus on click leaf')
        .keys(selectors.treeItem(5), keys.downArrow)
        .snapshot('Focus on keyboard subtree'),
  ],
}

export default config
