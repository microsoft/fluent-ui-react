import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import treeTitleBehavior from './treeTitleBehavior'

/**
 * @description
 * Adds role 'treeitem' to a non-leaf item and 'none' to a leaf item.
 * Adds 'aria-expanded' with a value based on the 'open' prop if item is not a leaf.
 * Adds 'tabIndex' as '-1' if the item is not a leaf.
 *
 * @specification
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'focusParent' action with 'ArrowLeft' on 'root', when has a closed subtree.
 * Triggers 'collapse' action with 'ArrowLeft' on 'root', when has an opened subtree.
 * Triggers 'expand' action with 'ArrowRight' on 'root', when has a closed subtree.
 * Triggers 'focusFirstChild' action with 'ArrowRight' on 'root', when has an opened subtree.
 */
const treeItemBehavior: Accessibility<TreeItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'none',
      ...(props.hasSubtree && {
        'aria-expanded': props.open,
        tabIndex: -1,
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        role: 'treeitem',
        'aria-setsize': props.treeSize,
        'aria-posinset': props.index,
        'aria-level': props.level,
      }),
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
      ...(isSubtreeOpen(props) && {
        collapse: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
        focusFirstChild: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
      ...(!isSubtreeOpen(props) && {
        expand: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
        focusParent: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
      }),
      expandSiblings: {
        keyCombinations: [{ keyCode: keyboardKey['*'] }],
      },
    },
  },
  childBehaviors: {
    title: treeTitleBehavior,
  },
})

export type TreeItemBehaviorProps = {
  /** If item is a subtree, it indicates if it's open. */
  open?: boolean
  level?: number
  index?: number
  hasSubtree?: boolean
  treeSize?: number
}

/** Checks if current tree item has a subtree and it is opened */
const isSubtreeOpen = (props: TreeItemBehaviorProps): boolean => {
  const { hasSubtree, open } = props
  return !!(hasSubtree && open)
}

export default treeItemBehavior
