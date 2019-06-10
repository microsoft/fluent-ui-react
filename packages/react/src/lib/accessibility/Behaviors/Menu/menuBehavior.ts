import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import menuItemBehavior from './menuItemBehavior'
import menuDividerBehavior from './menuDividerBehavior'

type MenuBehaviorProps = {
  /** Indicates if menu has its items displayed vertically. */
  vertical: boolean
}

/**
 * @description
 * Implements ARIA Menu design pattern.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in horizontal direction.
 * When 'vertical' prop is used, provides keyboard navigation in vertical direction.
 * Keyboard navigation is circular.
 */
const menuBehavior: Accessibility<MenuBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: props.vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
    },
  },
  childBehaviors: {
    item: menuItemBehavior,
    divider: menuDividerBehavior,
  },
})

export default menuBehavior
