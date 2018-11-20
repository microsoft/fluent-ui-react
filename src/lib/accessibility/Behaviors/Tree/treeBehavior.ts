import { Accessibility } from '../../types'

/**
 * @description
 * Adds role='tree' to the tree element and role='group' to the subtree elements.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.nested ? 'group' : 'tree',
    },
  },
})

export default treeBehavior
