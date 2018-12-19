import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @specification
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have toolbarButtonBehavior assigned.
 * Adds role 'toolbar' to 'root' component's part.
 * Embeds FocusZone into component allowing arrow key navigation through the children of the component.
 */
const toolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: false,
      preventDefaultWhenHandled: true,
      shouldFocusFirstElementWhenReceivedFocus: true,
    },
  },
})

export default toolbarBehavior
