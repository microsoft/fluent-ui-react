import { Accessibility } from '../../interfaces'

/**
 * @description
 * The InputBehavior adds:
 * - attribute 'aria-disabled' based on disabled property.
 */

const InputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default InputBehavior
