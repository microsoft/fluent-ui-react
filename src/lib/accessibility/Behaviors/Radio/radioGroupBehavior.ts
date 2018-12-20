import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Implements ARIA Radio Group design pattern.
 * @specification
 *  Adds role='radiogroup'. This allows screen readers to handle the component as a radio group.
 *  Performs 'nextItem' action on ArrowDown, ArrowRight.
 *  Performs 'prevItem' action on ArrowUp, ArrowLeft.
 */
const radioGroupBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'radiogroup',
    },
  },

  keyActions: {
    root: {
      nextItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }, { keyCode: keyboardKey.ArrowRight }],
      },
      prevItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
})

export default radioGroupBehavior
