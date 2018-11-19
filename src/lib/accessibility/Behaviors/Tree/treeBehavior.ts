import { Accessibility } from '../../types'
import * as _ from 'lodash'

/**
 * @description
 *  Adds role='tree' to the tree element and role='group' to the subtree elements.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.isSubTree ? 'group' : 'tree',
    },
  },
})

export default treeBehavior
