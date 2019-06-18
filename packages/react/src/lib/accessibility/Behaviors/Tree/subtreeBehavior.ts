import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Triggers 'expandSiblings' action with '*' on 'root'.
 * Adds role 'group' to 'root' component's part.
 */
const subtreeBehavior: Accessibility = () => ({
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

export default subtreeBehavior
