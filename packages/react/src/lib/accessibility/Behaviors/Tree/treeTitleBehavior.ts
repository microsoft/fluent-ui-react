import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @description
 * Adds role 'treeitem' if the title is a leaf node inside the tree.
 * Adds 'tabIndex' as '-1' if the title is a leaf node inside the tree.
 *
 * @specification
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const hierarchicalTreeTitleBehavior: Accessibility<TreeTitleBehavior> = props => ({
  attributes: {
    root: {
      ...(!props.hasSubtree && {
        tabIndex: -1,
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        role: 'treeitem',
        'aria-setsize': props.siblingsLength,
        'aria-posinset': props.indexInSubtree,
        'aria-level': props.level,
      }),
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default hierarchicalTreeTitleBehavior

type TreeTitleBehavior = {
  /** Indicated if tree title has a subtree */
  hasSubtree?: boolean
  /** If subtree is opened. */
  open?: boolean
  level?: number
  siblingsLength?: number
  indexInSubtree?: number
}
