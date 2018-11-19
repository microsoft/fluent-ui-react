import { Accessibility } from '../../types'
import * as _ from 'lodash'

/**
 * @description
 *  Adds attribute 'aria-expanded=true' based on whether the folowing subtree is expanded or not.
 */
const treeTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'treeitem',
      ...(props.hasSubtree && { 'aria-expanded': props.active ? 'true' : 'false' }),
    },
  },
})

export default treeTitleBehavior
