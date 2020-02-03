import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'

/**
 * @specification
 * Adds role='checkbox'. This allows screen readers to handle the component as a checkbox button.
 * Adds attribute 'aria-checked=true' based on the property 'checked'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
const checkboxBehavior: Accessibility<CheckboxBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-checked': !!props.checked,
      'aria-disabled': props.disabled,
      role: 'checkbox',
      tabIndex: 0,
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Spacebar }],
      },
    },
  },
})

export default checkboxBehavior

export type CheckboxBehaviorProps = {
  /** Whether or not item is checked. */
  checked?: boolean
  /** If the checkbox is in disabled state. */
  disabled?: boolean
}
