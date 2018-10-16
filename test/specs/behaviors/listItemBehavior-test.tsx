import { listItemBehavior } from 'src/lib/accessibility'

describe('ListItemBehavior.ts', () => {
  test('use SelectableListItemBehavior if selection prop is defined', () => {
    const property = {
      selection: true,
    }
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('option')
  })

  test('use BasicListBehavior if selection prop is NOT defined', () => {
    const property = {}
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('listitem')
  })
})
