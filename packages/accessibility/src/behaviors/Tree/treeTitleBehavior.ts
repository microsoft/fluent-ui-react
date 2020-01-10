import * as keyboardKey from 'keyboard-key'

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import { Accessibility } from '../../types'

/**
 * @specification
 * Adds attribute 'tabIndex=-1' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'role=treeitem' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'aria-setsize=3' based on the property 'treeSize' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Adds attribute 'aria-posinset=2' based on the property 'index' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Adds attribute 'aria-level=1' based on the property 'level' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const treeTitleBehavior: Accessibility<TreeTitleBehavior> = props => ({
  attributes: {
    root: {
      ...(!props.hasSubtree && {
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
    },
  },
})

export default treeTitleBehavior

type TreeTitleBehavior = {
  /** Indicated if tree title has a subtree */
  hasSubtree?: boolean
  level?: number
  treeSize?: number
  index?: number
}
