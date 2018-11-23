import { Accessibility } from '../../types'

/**
 * @specification
 * Adds attribute 'aria-expanded=true' based on the property 'open' and 'hasSubtree'
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...(props.hasSubtree && { 'aria-expanded': props.open ? 'true' : 'false' }),
    },
  },
})

export default treeTitleBehavior
