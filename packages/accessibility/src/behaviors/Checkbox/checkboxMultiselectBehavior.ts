import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'

/**
 * @description
 * Allows grouping of related checkboxes
 * Use inside of a container with `role='listbox'` and `aria-multiselectable='true'`
 * @specification
 * Adds role='option'. This allows screen readers to handle the component as an option in listbox.
 * Adds attribute 'aria-selected=true' based on the property 'checked'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
const checkboxMultiselectBehavior: Accessibility<CheckboxMultiselectBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-selected': !!props.checked,
      'aria-disabled': props.disabled,
      role: 'option',
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

export default checkboxMultiselectBehavior

type CheckboxMultiselectBehaviorProps = {
  /** Whether or not item is checked. */
  checked: boolean
  /** If the checkbox is in disabled state. */
  disabled?: boolean
}
