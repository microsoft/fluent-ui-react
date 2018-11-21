import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @specification
 * Adds role 'toolbar' to 'root' component's part.
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const toolbarBehavior: Accessibility = (props: any) => ({
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

export default toolbarBehavior
