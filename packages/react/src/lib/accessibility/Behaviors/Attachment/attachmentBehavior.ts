import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @specification
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const attachmentBehavior: Accessibility = () => ({
  attributes: {
    root: {
      tabIndex: 0,
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

export default attachmentBehavior
