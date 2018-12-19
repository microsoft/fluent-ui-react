import { listItemBehavior } from 'src/lib/accessibility'

describe('ListItemBehavior.ts', () => {
  test('use SelectableListItemBehavior if selectable prop is defined', () => {
    const property = {
      selectable: true,
    }
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('option')
  })

  test('use BasicListBehavior if selectable prop is NOT defined', () => {
    const property = {}
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('listitem')
  })
})
