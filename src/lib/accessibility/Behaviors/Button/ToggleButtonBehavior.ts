import { Accessibility, AccessibilityAttributes } from '../../interfaces'
import { ButtonAttributes } from '../Button/ButtonBehavior'

/**
 * @description
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button
 * Adds attribute 'aria-pressed=true' based on the property 'active'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

const ToggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...ButtonAttributes(props).root,
      'aria-pressed': !!props['active'],
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ToggleButtonBehavior
