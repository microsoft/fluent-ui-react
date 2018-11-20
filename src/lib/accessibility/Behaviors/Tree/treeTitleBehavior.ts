import { Accessibility } from '../../types'

/**
 * @description
 * Adds attribute 'aria-expanded=true' based on whether the folowing subtree is expanded or not.
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'treeitem',
      ...(props.hasSubtree && { 'aria-expanded': props.open ? 'true' : 'false' }),
    },
  },
})

export default treeTitleBehavior
