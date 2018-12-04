import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds role='option'. This role is used for a selectable item in a list.
 * Adds attribute 'aria-selected=true' based on the property 'active'. Based on this screen readers will recognize the selected state of the item.
 */

const selectableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['selected'],
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

export default selectableListItemBehavior
