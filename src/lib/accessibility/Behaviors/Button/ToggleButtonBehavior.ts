import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role='button' if element type is other than 'button'. This allows the screen readers to handle the component as button.
 * Adds attribute 'aria-pressed=true' based on the property 'active'. Based on this, screen readers can recognize state of button, if it is pressed or not.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

const ToggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-pressed': !!props['active'],
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ToggleButtonBehavior
