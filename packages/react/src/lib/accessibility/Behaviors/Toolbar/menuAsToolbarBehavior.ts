import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import menuAsToolbarButtonBehavior from './menuAsToolbarButtonBehavior'

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have menuAsToolbarButtonBehavior assigned.
 * @specification
 * Adds role 'toolbar' to 'root' component's part.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in bidirectional direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 */
const menuAsToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectional,
    },
  },
  childBehaviors: {
    item: menuAsToolbarButtonBehavior,
  },
})

export default menuAsToolbarBehavior
