import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import subtreeBehavior from './subtreeBehavior'

/**
 * @specification
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const treeBehavior: Accessibility = () => {
  const subtreeBehaviorData = subtreeBehavior({})
  return {
    attributes: {
      root: {
        ...subtreeBehaviorData.attributes.root,
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

export default treeBehavior
