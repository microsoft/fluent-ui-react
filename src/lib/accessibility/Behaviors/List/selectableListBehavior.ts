import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 */
const selectableListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'listbox',
    },
  },
  keyActions: {
    root: {
      moveNext: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
      movePrevious: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
      },
      moveFirst: {
        keyCombinations: [{ keyCode: keyboardKey.Home }],
      },
      moveLast: {
        keyCombinations: [{ keyCode: keyboardKey.End }],
      },
    },
  },
})

export default selectableListBehavior
