import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @specification
 * Embeds FocusZone into component allowing arrow key navigation through the children of the component.
 */
const gridBehavior: Accessibility = (props: any) => ({
  attributes: {},
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: false,
      preventDefaultWhenHandled: true,
    },
  },
})

export default gridBehavior
