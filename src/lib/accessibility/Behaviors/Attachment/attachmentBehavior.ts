import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const attachmentBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      tabIndex: '0',
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

export default attachmentBehavior
