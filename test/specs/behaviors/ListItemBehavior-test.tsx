import { ListItemBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinitionFunction } from 'src/lib/accessibility/interfaces'

describe('ListItemBehavior.ts', () => {
  test('use SelectableListItemBehavior if selection prop is defined', () => {
    const property = {
      selection: true,
    }
    const expectedResult = (ListItemBehavior as AccessibilityDefinitionFunction)(property)
    expect(expectedResult.attributes.root.role).toEqual('option')
  })

  test('use BasicListBehavior if selection prop is NOT defined', () => {
    const property = {}
    const expectedResult = (ListItemBehavior as AccessibilityDefinitionFunction)(property)
    expect(expectedResult.attributes.root.role).toEqual('listitem')
  })
})
