import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role='list'.
 * The 'list' role is used to identify an element that creates a list.
 */

const BasicListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
})

export default BasicListBehavior
