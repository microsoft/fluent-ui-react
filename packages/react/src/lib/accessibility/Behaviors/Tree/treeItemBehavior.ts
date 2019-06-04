import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 */
const treeItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  keyActions: {
    root: {
      getFocusFromParent: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      setFocusToFirstChild: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
    },
  },
})

export default treeItemBehavior
