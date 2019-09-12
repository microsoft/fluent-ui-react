import { treeItemAsListItemBehavior } from 'src/lib/accessibility'

describe('TreeItemAsListItemBehavior', () => {
  describe('role', () => {
    test(`is 'none' if not a leaf`, () => {
      const expectedResult = treeItemAsListItemBehavior({ hasSubtree: true })
      expect(expectedResult.attributes.root.role).toEqual('listitem')
    })
  })
})
