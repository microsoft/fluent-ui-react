import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * Adds role='listbox'.
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 */

const SelectableListBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listbox',
    },
  },
}

export default SelectableListBehavior
