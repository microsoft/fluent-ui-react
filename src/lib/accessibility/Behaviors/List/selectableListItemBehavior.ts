import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds role 'presentation' to 'root' component's part.
 * Adds role 'option' to 'item' component's part. This role is used for a selectable item in a list.
 * Adds attribute 'aria-selected=true' based on the property 'selected'. Based on this screen readers will recognize the selected state of the item.
 * Performs click action with 'Enter' and 'Spacebar' on 'root'.
 */

const selectableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    item: {
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
