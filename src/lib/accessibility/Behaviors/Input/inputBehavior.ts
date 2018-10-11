import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by directly providing 'aria-disabled' property to the component.
 */

const inputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': 'aria-disabled' in props ? props['aria-disabled'] : props['disabled'],
    },
  },
})

export default inputBehavior
