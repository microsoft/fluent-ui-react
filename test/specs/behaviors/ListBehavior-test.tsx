import { listBehavior } from 'src/lib/accessibility'

describe('ListBehavior.ts', () => {
  test('use SelectableListBehavior if selection prop is defined', () => {
    const property = {
      selection: true,
    }
    const expectedResult = listBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('listbox')
  })

  test('use BasicListItemBehavior if selection prop is NOT defined', () => {
    const property = {}
    const expectedResult = listBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('list')
  })
})
