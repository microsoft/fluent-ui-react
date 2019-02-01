import { listBehavior } from 'src/lib/accessibility'

describe('ListBehavior.ts', () => {
  test('use SelectableListBehavior if selectable prop is defined', () => {
    const property = {
      selectable: true,
    }
    const expectedResult = listBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('listbox')
  })

  test('use BasicListItemBehavior if selectable prop is NOT defined', () => {
    const property = {}
    const expectedResult = listBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('list')
  })
})
