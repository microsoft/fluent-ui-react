import { Accessibility } from '../../types'

/**
 * @description
 * The 'list' role is used to identify an element that creates a list.
 *
 * @specification
 * Adds role='list'.
 */

const basicListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
})

export default basicListBehavior
