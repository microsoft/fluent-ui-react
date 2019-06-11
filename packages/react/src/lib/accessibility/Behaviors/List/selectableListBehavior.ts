import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { ListBehaviorProps } from './listBehavior'

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 * Triggers 'moveNext' action with 'ArrowDown' on 'root'.
 * Triggers 'movePrevious' action with 'ArrowUp' on 'root'.
 * Triggers 'moveFirst' action with 'Home' on 'root'.
 * Triggers 'moveLast' action with 'End' on 'root'.
 */
const selectableListBehavior: Accessibility<ListBehaviorProps> = props => ({
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
