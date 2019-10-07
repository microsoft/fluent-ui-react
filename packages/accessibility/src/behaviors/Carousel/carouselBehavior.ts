import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Triggers 'moveNext' action with 'ArrowRight' on 'itemsContainer'.
 * Triggers 'movePrevious' action with 'ArrowLeft' on 'itemsContainer'.
 */
const carouselBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'region',
    },
    itemsContainer: {
      'aria-live': 'polite',
    },
  },

  keyActions: {
    itemsContainer: {
      moveNext: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      movePrevious: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
})

export default carouselBehavior
