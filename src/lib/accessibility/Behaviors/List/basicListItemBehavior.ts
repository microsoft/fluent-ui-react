import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role='listitem'.
 * The 'listitem' role is used to identify an element that is a single item in a list.
 */

const basicListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
})

export default basicListItemBehavior
