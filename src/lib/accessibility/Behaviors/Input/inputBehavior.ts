import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */

const inputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default inputBehavior
