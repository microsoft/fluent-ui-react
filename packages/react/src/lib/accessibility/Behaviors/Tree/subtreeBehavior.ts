import { Accessibility } from '../../types'

/**
 * @specification
 * Triggers 'expandSiblings' action with '*' on 'root'.
 * Adds role 'group' to 'root' component's part.
 */
const subtreeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
})

export default subtreeBehavior
