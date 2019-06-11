import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const subtreeBehavior: Accessibility = (props: any) => ({
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
