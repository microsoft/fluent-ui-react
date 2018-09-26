import { IAccessibilityDefinition } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Adds role='option'. This role is used for a selectable item in a list.
 * Adds attribute 'aria-selected=true' based on the property 'active'. Based on this screen readers will recognize the selected state of the item.
 */

const SelectableListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default SelectableListItemBehavior
