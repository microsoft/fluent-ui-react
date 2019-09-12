import { treeTitleAsListItemTitleBehavior } from 'src/lib/accessibility'

describe('TreeTitleBehavior', () => {
  describe('role', () => {
    test(`is added with 'treeitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleAsListItemTitleBehavior({ hasSubtree: false })
      expect(expectedResult.attributes.root.role).toEqual('listitem')
    })
  })
})
