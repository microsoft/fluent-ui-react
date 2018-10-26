import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * Wraps component in FocusZone allowing arrow key navigation through the children of the component.
 */
const gridBehavior: Accessibility = (props: any) => ({
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
})

export default gridBehavior
