import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { ListBehaviorProps } from './listBehavior'

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 * Triggers 'moveNext' action with 'ArrowDown' on 'root', when orientation is vertical.
 * Triggers 'moveNext' action with 'ArrowRight' on 'root', when orientation is horizontal.
 * Triggers 'movePrevious' action with 'ArrowUp' on 'root', when orientation is vertical.
 * Triggers 'movePrevious' action with 'ArrowLeft' on 'root', when orientation is horizontal.
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
        keyCombinations: [
          { keyCode: props.vertical ? keyboardKey.ArrowDown : keyboardKey.ArrowRight },
        ],
      },
      movePrevious: {
        keyCombinations: [
          { keyCode: props.vertical ? keyboardKey.ArrowUp : keyboardKey.ArrowLeft },
        ],
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
