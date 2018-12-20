import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * Implements ARIA Tabs design pattern.
 * Child item components need to have tabBehavior assigned.
 * @specification
 * Adds role 'tablist' to 'root' component's part.
 * Embeds FocusZone into component allowing arrow key navigation through the children of the component.
 */
const tabListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'tablist',
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

export default tabListBehavior
