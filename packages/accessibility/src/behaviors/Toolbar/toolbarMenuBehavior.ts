import { Accessibility } from '../../types'
import { FocusZoneDirection } from '../../focusZone/types'
import toolbarMenuItemBehavior from './toolbarMenuItemBehavior'
import * as keyboardKey from 'keyboard-key'

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
const toolbarMenuBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
  focusZone: {
    props: {
      isCircularNavigation: true,
      shouldFocusOnMount: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  childBehaviors: { item: toolbarMenuItemBehavior },
})

export default toolbarMenuBehavior
