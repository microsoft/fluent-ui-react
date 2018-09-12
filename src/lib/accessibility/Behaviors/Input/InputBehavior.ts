import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

const InputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default InputBehavior
