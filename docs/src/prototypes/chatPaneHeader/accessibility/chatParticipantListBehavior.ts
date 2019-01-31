import { Accessibility, FocusZoneMode, FocusZoneDirection } from '@stardust-ui/react'

/**
 * @description
 * The behavior is designed when user needs create list of actionable elements.
 * @specification
 * Adds role='list'.
 * Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
 */

const chatParticipantListBehavior: Accessibility = (props: any) => ({
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

export default chatParticipantListBehavior
