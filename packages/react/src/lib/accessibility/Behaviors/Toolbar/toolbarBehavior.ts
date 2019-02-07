import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have toolbarButtonBehavior assigned.
 * @specification
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
      shouldFocusInnerElementWhenReceivedFocus: true,
    },
  },
})

export default toolbarBehavior
