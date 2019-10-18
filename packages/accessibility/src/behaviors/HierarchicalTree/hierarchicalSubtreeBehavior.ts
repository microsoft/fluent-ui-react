import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'

/**
 * @specification
 * Triggers 'expandSiblings' action with '*' on 'root'.
 * Adds role 'group' to 'root' slot.
 */
const hierarchicalSubtreeBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
  keyActions: {
    root: {
      expandSiblings: {
        keyCombinations: [{ keyCode: keyboardKey['*'] }],
      },
    },
  },
})

export default hierarchicalSubtreeBehavior
