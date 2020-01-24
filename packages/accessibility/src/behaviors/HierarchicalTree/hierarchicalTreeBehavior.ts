import { Accessibility, AccessibilityAttributes } from '../../types'
import { FocusZoneDirection } from '../../focusZone/types'
import hierarchicalSubtreeBehavior from './hierarchicalSubtreeBehavior'

/**
 * @specification
 * Adds role 'tree' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Provides arrow key navigation in vertical direction.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const hierarchicalTreeBehavior: Accessibility<TreeBehaviorProps> = props => {
  const subtreeBehaviorData = hierarchicalSubtreeBehavior({})
  return {
    attributes: {
      root: {
        ...subtreeBehaviorData.attributes.root,
        role: 'tree',
        'aria-labelledby': props['aria-labelledby'],
      },
    },
    keyActions: {
      root: {
        ...subtreeBehaviorData.keyActions.root,
      },
    },
    focusZone: {
      props: {
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}

type TreeBehaviorProps = {} & Pick<AccessibilityAttributes, 'aria-labelledby'>

export default hierarchicalTreeBehavior
