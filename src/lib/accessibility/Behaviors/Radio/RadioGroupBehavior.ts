import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'

const RadioGroupBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'radiogroup',
    },
  },

  keyActions: {
    root: {
      nextItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowRight }],
      },
      prevItem: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }, { keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
})

export default RadioGroupBehavior
