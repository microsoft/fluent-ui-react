import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'

/**
 * @description
 * GIFs are visual representation only so hidden unless alt or title applied.
 *
 * Enter/space keys play and pause the gif respectively
 *
 * @specification
 * Adds role 'presentation' to 'root' component's part.
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 */
const embedBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-hidden': props.alt || props.title ? undefined : true,
      role: 'presentation',
      tabIndex: 0,
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

export default embedBehavior
