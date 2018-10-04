import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role 'tablist' to 'root' component's part.
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const tabListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'tablist',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
      preventDefaultWhenHandled: true,
    },
  },
})

export default tabListBehavior
