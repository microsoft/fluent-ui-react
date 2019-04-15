import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      direction: FocusZoneDirection.vertical,
    },
  },
})

export default treeBehavior
