import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @description
 * Adds role 'treeitem' if title has a subtree or 'none' if it is an end node.
 *
 * @specification
 * Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...(!props.hasSubtree && {
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
    },
  },
})

export default treeTitleBehavior
