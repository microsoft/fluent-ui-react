import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @description
 * Adds role 'treeitem' to a non-leaf item and 'none' to a leaf item.
 * Adds 'aria-expanded' with a value based on the 'open' prop if item is not a leaf.
 *
 * @specification
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'collapseOrReceiveFocus' action with 'ArrowLeft' on 'root'.
 * Triggers 'expandOrPassFocus' action with 'ArrowRight' on 'root'.
 */
const treeItemBehavior: Accessibility<TreeItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'none',
      ...(props.items &&
        props.items.length && {
          'aria-expanded': props.open ? 'true' : 'false',
          tabIndex: 0,
          [IS_FOCUSABLE_ATTRIBUTE]: true,
          role: 'treeitem',
        }),
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
      collapseOrReceiveFocus: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      expandOrPassFocus: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
    },
  },
})

export type TreeItemBehaviorProps = {
  items?: object[]
  open?: boolean
}

export default treeItemBehavior
