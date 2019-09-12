import * as _ from 'lodash'
import { Accessibility } from '../../types'
import treeItemBehavior from './treeItemBehavior'

/**
 * @description
 * Adds role 'listitem' to a non-leaf item and 'none' to a leaf item.
 */
const treeItemAsListItemBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props)
  return _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree && {
          role: 'listitem',
        }),
      },
    },
  })
}

export type TreeItemBehaviorProps = {
  /** Indicated if tree title has a subtree */
  hasSubtree?: boolean
}

export default treeItemAsListItemBehavior
