import { Accessibility, AccessibilityAttributes, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import subtreeBehavior from './subtreeBehavior'

/**
 * @specification
 * Adds role 'tree' to 'root' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' component's part.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const treeBehavior: Accessibility<TreeBehaviorProps> = props => {
  const subtreeBehaviorData = subtreeBehavior({})
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
      mode: FocusZoneMode.Embed,
      props: {
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}

type TreeBehaviorProps = {} & Pick<AccessibilityAttributes, 'aria-labelledby'>

export default treeBehavior
