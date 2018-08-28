import { Accessibility } from '../../interfaces'

/**
 * @description
 * The ToggleButtonBehavior adds:
 * - role='button' if element type is other than 'button'. This allows the screen readers handle component as button.
 * - attribute 'aria-pressed' based on the active property. Based on this, screen readers can recognized state of button, if it is pressed or not.
 * - attribute 'aria-disabled' based on disabled property.
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
