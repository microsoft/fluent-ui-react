import { Tree, TreeItem } from '@stardust-ui/react'

describe('Tree', () => {
  const tree = `.${Tree.className}`
  const treeItem = index => `.${TreeItem.className}:nth-child(${index})`

  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, tree)
    })

    it('moves focus to first child from expanded parent', async () => {
      await e2e.clickOn(treeItem(1)) // expands first subtree and focuses it.
      await e2e.pressKey('ArrowRight') // moves focus to first child.

      expect(await e2e.isFocused(`${treeItem(1)} ${treeItem(1)}`)).toBe(true)
    })

    it('moves focus to parent from one of its children', async () => {
      await e2e.clickOn(treeItem(1)) // expands first subtree and focuses it.
      await e2e.focusOn(`${treeItem(1)} ${treeItem(1)}`) // move focus to first child.
      await e2e.pressKey('ArrowLeft') // moves focus back to parent.

      expect(await e2e.isFocused(treeItem(1))).toBe(true)
    })
  })
})
