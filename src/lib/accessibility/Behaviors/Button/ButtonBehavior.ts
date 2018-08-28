import { Accessibility } from '../../interfaces'

/**
 * @description
 * The ButtonBehavior adds role='button' if element type is other than 'button'.
 * This allows the screen readers handle component as button.
 */

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ButtonBehavior
