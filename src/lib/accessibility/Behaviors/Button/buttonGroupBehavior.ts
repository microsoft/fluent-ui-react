import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role 'presentation' to 'root' component's part.
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const buttonGroupBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
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

export default buttonGroupBehavior
