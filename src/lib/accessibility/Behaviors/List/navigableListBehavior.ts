import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * @specification
 * Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
 */

const navigableListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: props.vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
    },
  },
})

export default navigableListBehavior
