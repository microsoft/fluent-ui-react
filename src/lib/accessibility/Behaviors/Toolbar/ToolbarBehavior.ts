import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role 'toolbar' to 'root' component's part.
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const ToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
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

export default ToolbarBehavior
