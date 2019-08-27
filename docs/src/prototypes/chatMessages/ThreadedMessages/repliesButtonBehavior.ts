import { Accessibility } from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'

const repliesButtonBehavior: Accessibility = () => ({
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})
export default repliesButtonBehavior
