import { Accessibility, AccessibilityAttributes } from '../../interfaces'

/**
 * @description
 *  Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

export const ButtonAttributes = (props: any): AccessibilityAttributes => ({
  root: {
    role: props.as === 'button' ? undefined : 'button',
    'aria-disabled': !!props['disabled'],
  },
})

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: ButtonAttributes(props),
})

export default ButtonBehavior
