import { TreeItem } from '@stardust-ui/react'

const selectors = {
  treeItem: (itemIndex: number) => `.${TreeItem.className} :nth-child(${itemIndex}`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(selectors.treeItem(1))
        .click(selectors.treeItem(2))
        .snapshot('Focus on click subtree'),
    (builder, keys) =>
      builder.keys(selectors.treeItem(2), keys.downArrow).snapshot('Focus on keyboard leaf'),
    builder => builder.click(selectors.treeItem(5)).snapshot('Focus on click leaf'),
    (builder, keys) =>
      builder.keys(selectors.treeItem(5), keys.downArrow).snapshot('Focus on keyboard subtree'),
  ],
}

export default config
