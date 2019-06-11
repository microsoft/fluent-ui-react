import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @specification
 */
const treeItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...(props.items &&
        props.items.length && {
          'aria-expanded': props.open ? 'true' : 'false',
          tabIndex: 0,
          [IS_FOCUSABLE_ATTRIBUTE]: true,
        }),
      role: props.hasSubtree ? 'treeitem' : 'none',
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
      getFocusFromParent: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
      setFocusToFirstChild: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
    },
  },
})

export default treeItemBehavior
