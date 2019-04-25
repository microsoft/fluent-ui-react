import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @specification
 * Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...(props.hasSubtree && { 'aria-expanded': props.open ? 'true' : 'false' }),
      tabindex: 0,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
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
