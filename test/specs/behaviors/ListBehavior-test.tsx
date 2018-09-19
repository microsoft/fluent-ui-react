import { ListBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinitionFunction } from '../../../src/lib/accessibility/interfaces'

describe('ListBehavior.ts', () => {
  test('use SelectableListBehavior if selection prop is defined', () => {
    const property = {
      selection: true,
    }
    const expectedResult = (ListBehavior as AccessibilityDefinitionFunction)(property)
    expect(expectedResult.attributes.root.role).toEqual('listbox')
  })

  test('use BasicListItemBehavior if selection prop is NOT defined', () => {
    const property = {}
    const expectedResult = (ListBehavior as AccessibilityDefinitionFunction)(property)
    expect(expectedResult.attributes.root.role).toEqual('list')
  })
})
