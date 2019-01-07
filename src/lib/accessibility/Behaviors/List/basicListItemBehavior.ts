import { Accessibility } from '../../types'

/**
 * @description
 * The 'listitem' role is used to identify an element that is a single item in a list.
 *
 * @specification
 * Adds role 'presentation' to 'root' component's part.
 * Adds role 'listitem' to 'item' component's part.
 */

const basicListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    item: {
      role: 'listitem',
    },
  },
})

export default basicListItemBehavior
