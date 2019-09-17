import * as keyboardKey from 'keyboard-key'

import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone'

/**
 * @specification
 *  Adds attribute 'aria-checked=true' based on the property 'checked'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 *  Adds role='menuitemradio'.
 */
const toolbarMenuItemRadioBehavior: Accessibility<ToolbarMenuItemRadioBehaviorProps> = props => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
      role: 'menuitemradio',
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

export default toolbarMenuItemRadioBehavior

type ToolbarMenuItemRadioBehaviorProps = {
  checked?: boolean
  disabled?: boolean
}
