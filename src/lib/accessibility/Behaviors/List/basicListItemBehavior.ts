import { Accessibility } from '../../types'

/**
 * @description
 * The 'listitem' role is used to identify an element that is a single item in a list.
 *
 * @specification
 * Adds role='listitem'.
 */

const basicListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
})

export default basicListItemBehavior
