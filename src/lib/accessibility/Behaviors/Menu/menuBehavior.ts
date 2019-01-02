import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Implements ARIA Menu design pattern.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
 */

const menuBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: props.vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
    },
  },
})

export default menuBehavior
