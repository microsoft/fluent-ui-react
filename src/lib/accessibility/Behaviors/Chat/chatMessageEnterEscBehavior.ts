import { Accessibility, FocusZoneMode } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

/**
 * @description
 * Adds role 'presentation' until we come up with final roles for chat.
 * Sets the message to be a focusable element.
 * Adds a default focus zone navigation where a user navigates using arrow keys in all directions.
 */
const chatMessageEnterEscBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
    },
  },
})

export default chatMessageEnterEscBehavior
