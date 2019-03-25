import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * GIFs are visual representation only so hidden unless alt or title applied.
 *
 * Enter/space keys play and pause the gif respectively
 *
 * @specification
 * Sets 'aria-hidden' unless alt or title attribute provided
 */
const videoGifBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      tabIndex: '0',
      'aria-hidden': props['alt'] || props['title'] ? undefined : true,
      role: 'presentation',
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

export default videoGifBehavior
