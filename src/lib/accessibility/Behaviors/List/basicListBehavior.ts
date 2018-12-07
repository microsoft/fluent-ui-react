import { Accessibility } from '../../types'

/**
 * @description
 * Adds role='list'.
 * The 'list' role is used to identify an element that creates a list.
 */

const basicListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
})

export default basicListBehavior
