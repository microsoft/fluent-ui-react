import { Accessibility } from '../../interfaces'

/**
 * @description
 *  Adds role='radio'. This allows screen readers to handle the component as a radio button.
 *  Adds attribute 'aria-checked=true' based on the property 'checked'.
 *  Implements roving tabIndex
 *  Adds role 'presentation' on label element
 */
const radioGroupItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'radio',
      tabIndex: props.checked ? '0' : '-1',
      'aria-checked': props.checked,
      'aria-disabled': props.disabled,
    },
  },
})

export default radioGroupItemBehavior
