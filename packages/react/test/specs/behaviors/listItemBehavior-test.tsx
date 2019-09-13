import { listItemBehavior } from 'src/lib/accessibility'
import { IS_FOCUSABLE_ATTRIBUTE } from 'src/lib/accessibility/FocusZone'

describe('ListItemBehavior.ts', () => {
  test('use SelectableListItemBehavior if selectable prop is defined', () => {
    const property = {
      selectable: true,
    }
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('option')
  })

  test('use NavigableListItemBehavior if navigable prop is defined', () => {
    const property = {
      navigable: true,
    }
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('menuitem')
    expect(expectedResult.attributes.root[IS_FOCUSABLE_ATTRIBUTE]).toEqual(true)
  })

  test('use BasicListBehavior if selectable prop is NOT defined', () => {
    const property = {}
    const expectedResult = listItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('listitem')
  })
})
