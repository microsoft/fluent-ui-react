import { Accessibility } from '../../types'

/**
 * @specification
 * Adds attribute 'aria-expanded=true' based on the property 'open' if the component has 'hasSubtree' property.
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...(props.hasSubtree && { 'aria-expanded': props.open ? 'true' : 'false' }),
    },
  },
})

export default treeTitleBehavior
