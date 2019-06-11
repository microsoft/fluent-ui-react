import { treeTitleBehavior } from 'src/lib/accessibility'

describe('TreeTitleBehavior.ts', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: false })
      expect(expectedResult.attributes.root.tabIndex).toEqual(0)
    })

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: true })
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined()
    })
  })

  describe('role', () => {
    test(`is added with 'treeitem' value to a title with hasSubtree prop false`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: false })
      expect(expectedResult.attributes.root.role).toEqual('treeitem')
    })

    test(`is not added to a title with hasSubtree prop true`, () => {
      const expectedResult = treeTitleBehavior({ hasSubtree: true })
      expect(expectedResult.attributes.root.role).toBeUndefined()
    })
  })
})
