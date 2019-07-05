import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @description
 * Adds role 'treeitem' to a non-leaf item and 'none' to a leaf item.
 * Adds 'aria-expanded' with a value based on the 'open' prop if item is not a leaf.
 * Adds 'tabIndex' as '-1' if the item is not a leaf.
 *
 * @specification
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
          tabIndex: -1,
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
      receiveFocus: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        condition: doesEventComesFromChildItem,
      },
      collapse: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        condition: (event, props: TreeItemBehaviorProps) =>
          !doesEventComesFromChildItem(event, props) && props.open,
      },
      expand: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        condition: (event, props: TreeItemBehaviorProps) => !isSubtreeOpen(event, props),
      },
      passFocus: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        condition: isSubtreeOpen,
      },
    },
  },
})

export default treeItemBehavior

export type TreeItemBehaviorProps = {
  /** If item is a subtree, it contains items. */
  items?: object[]
  /** If item is a subtree, it indicates if it's open. */
  open?: boolean
}

/** Checks if the event comes from a child item */
const doesEventComesFromChildItem = (event, props: TreeItemBehaviorProps): boolean => {
  const { items } = props
  return !!(event.currentTarget !== event.target && items && items.length)
}

const isSubtreeOpen = (event, props: TreeItemBehaviorProps): boolean => !!props.open
