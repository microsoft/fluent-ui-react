import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const subtreeBehavior: Accessibility = () => ({
  attributes: {
    root: {},
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
