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
 * Triggers 'receiveFocus' action with 'ArrowLeft' on 'root'.
 * Triggers 'collapse' action with 'ArrowLeft' on 'root'.
 * Triggers 'expand' action with 'ArrowRight' on 'root'.
 * Triggers 'passFocus' action with 'ArrowRight' on 'root'.
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
      ...(isSubtreeOpen(props) && {
        receiveFocus: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
          shouldHandle: doesEventComesFromChildItem,
        },
        collapse: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
          shouldHandle: event => !doesEventComesFromChildItem(event),
        },
      }),
      ...(!isSubtreeOpen(props) && {
        expand: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
      ...(isSubtreeOpen(props) && {
        passFocus: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
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
const doesEventComesFromChildItem = (event): boolean => {
  return event.currentTarget !== event.target
}

/** Checks if current tree item has a subtree and it is opened */
const isSubtreeOpen = (props: TreeItemBehaviorProps): boolean => {
  const { items, open } = props
  return !!(items && items.length && open)
}
