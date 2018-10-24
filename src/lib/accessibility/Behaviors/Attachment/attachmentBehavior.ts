import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Performs click action with 'Enter' and 'Spacebar' on 'root'.
 */

const attachmentBehavior: Accessibility = (props: any) => ({
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default attachmentBehavior
