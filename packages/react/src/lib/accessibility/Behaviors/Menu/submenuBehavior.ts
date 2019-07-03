import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import menuItemBehavior from './menuItemBehavior'

/**
 * @description
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 * Component will get focus when mounted.
 */
const submenuBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      shouldFocusOnMount: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  childBehaviors: { item: menuItemBehavior },
})

export default submenuBehavior
