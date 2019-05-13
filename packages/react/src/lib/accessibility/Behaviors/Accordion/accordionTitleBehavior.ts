import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 */
const accordionTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  keyActions: {
    button: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default accordionTitleBehavior
