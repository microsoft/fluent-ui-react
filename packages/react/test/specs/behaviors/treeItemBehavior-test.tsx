import { treeItemBehavior } from 'src/lib/accessibility'

describe('TreeItemBehavior', () => {
  describe('tabIndex', () => {
    test(`is added with '0' value to an item that is expandable`, () => {
      const expectedResult = treeItemBehavior({ items: [{ key: '1' }] })
      expect(expectedResult.attributes.root.tabIndex).toEqual(-1)
    })

    test(`is not added to a leaf item (no items)`, () => {
      const expectedResult = treeItemBehavior({})
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined()
    })

    test(`is not added to a leaf item (empty items)`, () => {
      const expectedResult = treeItemBehavior({ items: [] })
      expect(expectedResult.attributes.root.tabIndex).toBeUndefined()
    })
  })

  describe('aria-expanded', () => {
    test(`is not added to a leaf item`, () => {
      const expectedResult = treeItemBehavior({})
      expect(expectedResult.attributes.root['aria-expanded']).toBeUndefined()
    })

    test(`is added with 'false' value to an item that is expandable but not open`, () => {
      const expectedResult = treeItemBehavior({ items: [{ key: '1' }], open: false })
      expect(expectedResult.attributes.root['aria-expanded']).toEqual('false')
    })

    test(`is added with 'false' value to an item that is expandable and open`, () => {
      const expectedResult = treeItemBehavior({ items: [{ key: '1' }], open: true })
      expect(expectedResult.attributes.root['aria-expanded']).toEqual('true')
    })
  })

  describe('role', () => {
    test(`is 'none' if not a leaf`, () => {
      const expectedResult = treeItemBehavior({ items: [{ key: '1' }] })
      expect(expectedResult.attributes.root.role).toEqual('treeitem')
    })

    test(`is 'treeitem' if not a leaf`, () => {
      const expectedResult = treeItemBehavior({})
      expect(expectedResult.attributes.root.role).toEqual('none')
    })
  })
})
