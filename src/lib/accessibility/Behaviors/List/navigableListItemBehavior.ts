import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * The 'list' role is used to identify an element that creates a list.
 *
 * @specification
 * Adds role='list'.
 */

const navigableListItemBehavior: Accessibility = (props: any) => ({
  keyActions: {
    item: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default navigableListItemBehavior
