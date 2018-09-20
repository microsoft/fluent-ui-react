import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role 'presentation' to 'root' component's part.
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const ButtonGroupBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
    },
  },
}

export default ButtonGroupBehavior
