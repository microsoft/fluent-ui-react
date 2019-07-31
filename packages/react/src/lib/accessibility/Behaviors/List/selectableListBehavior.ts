import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { ListBehaviorProps } from './listBehavior'

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 * Adds attribute 'aria-orientation=horizontal' to 'root' slot if 'horizontal' property is true. Does not set the attribute otherwise.
 * Triggers the 'moveNext' action with 'ArrowDown' on 'root', when orientation is vertical.
 * Triggers the 'moveNext' action with 'ArrowRight' on 'root', when orientation is horizontal.
 * Triggers the 'movePrevious' action with 'ArrowUp' on 'root', when orientation is vertical.
 * Triggers the 'movePrevious' action with 'ArrowLeft' on 'root', when orientation is horizontal.
 * Triggers 'moveFirst' action with 'Home' on 'root'.
 * Triggers 'moveLast' action with 'End' on 'root'.
 */
const selectableListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listbox',
      ...(props.horizontal && {
        'aria-orientation': 'horizontal',
      }),
    },
  },
  keyActions: {
    root: {
      moveNext: {
        keyCombinations: [
          { keyCode: props.horizontal ? keyboardKey.ArrowRight : keyboardKey.ArrowDown },
        ],
      },
      movePrevious: {
        keyCombinations: [
          { keyCode: props.horizontal ? keyboardKey.ArrowLeft : keyboardKey.ArrowUp },
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
