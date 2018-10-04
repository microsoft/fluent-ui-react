import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button
 * Adds attribute 'aria-pressed=true' based on the property 'active'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

const toggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': !!props['disabled'],
      'aria-pressed': !!props['active'],
    },
  },
})

export default toggleButtonBehavior
