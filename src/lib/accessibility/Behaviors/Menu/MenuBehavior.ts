import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role='menu'.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 */

const MenuBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
}

export default MenuBehavior
