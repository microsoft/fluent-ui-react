import { Accessibility } from '../../types'

/**
 * @specification
 *  Adds role='radio'. This allows screen readers to handle the component as a radio button.
 *  Adds attribute 'aria-checked=true' based on the property 'checked'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 *  Implements roving tabIndex.
 */
const radioGroupItemBehavior: Accessibility<RadioGroupItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'radio',
      tabIndex: props.checked ? 0 : -1,
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
    },
  },
})

export default radioGroupItemBehavior

type RadioGroupItemBehaviorProps = {
  /** Indicates if radio item is selected. */
  checked?: boolean
  /** Indicates if radio item is disabled. */
  disabled?: boolean
}
