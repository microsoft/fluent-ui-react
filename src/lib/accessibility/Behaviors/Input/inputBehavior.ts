import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */

const inputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': props['aria-disabled'] || props['disabled'],
    },
  },
})

export default inputBehavior
