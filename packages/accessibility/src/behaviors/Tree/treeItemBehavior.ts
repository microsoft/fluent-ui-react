import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import treeTitleBehavior from './treeTitleBehavior'

/**
 * @description
 * Adds role 'treeitem' to a non-leaf item and 'none' to a leaf item.
 * Adds 'aria-expanded' with a value based on the 'expanded' prop if item is not a leaf.
 * Adds 'tabIndex' as '-1' if the item is not a leaf.
 *
 * @specification
 * Adds attribute 'aria-expanded=true' based on the property 'expanded' if the component has 'hasSubtree' property.
 * Adds attribute 'tabIndex=-1' to 'root' slot if 'hasSubtree' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-setsize=3' based on the property 'treeSize' if the component has 'hasSubtree' property.
 * Adds attribute 'aria-posinset=2' based on the property 'index' if the component has 'hasSubtree' property.
 * Adds attribute 'aria-level=1' based on the property 'level' if the component has 'hasSubtree' property.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'expandSiblings' action with '*' on 'root'.
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
        'aria-expanded': props.expanded,
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
      ...(isSubtreeExpanded(props) && {
        collapse: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
        focusFirstChild: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
      ...(!isSubtreeExpanded(props) && {
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
  /** If item is a subtree, it indicates if it's expanded. */
  expanded?: boolean
  level?: number
  index?: number
  hasSubtree?: boolean
  treeSize?: number
}

/** Checks if current tree item has a subtree and it is expanded */
const isSubtreeExpanded = (props: TreeItemBehaviorProps): boolean => {
  const { hasSubtree, expanded } = props
  return !!(hasSubtree && expanded)
}

export default treeItemBehavior
