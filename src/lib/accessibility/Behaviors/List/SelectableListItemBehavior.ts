import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * The SelectableListItemBehavior adds :
 * - role='option', this role is used for a selectable item in a list
 * - attribute 'aria-selected' based on the active property. Based on this, screen readers can recognized state of item in list, if it is selected or not.
 */

const SelectableListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})

export default SelectableListItemBehavior
