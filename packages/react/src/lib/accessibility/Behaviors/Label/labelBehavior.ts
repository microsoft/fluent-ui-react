import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'performRemove' action with 'Delete' or 'Backspace' on 'root'.
 */
const labelBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      tabIndex: 0,
    },
  },
  keyActions: {
    root: {
      performRemove: {
        keyCombinations: [{ keyCode: keyboardKey.Delete }, { keyCode: keyboardKey.Backspace }],
      },
    },
  },
})

export default labelBehavior
