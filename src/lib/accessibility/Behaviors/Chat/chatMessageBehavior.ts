import { Accessibility, FocusZoneMode } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneTabbableElements, FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Adds role 'presentation' until we come up with final roles for chat.
 * Sets the message to be a focusable element.
 * Adds a vertical circular focus zone navigation where a user navigates using a Tab key.
 * Adds a key action which prevents up and down arrow keys from navigating in FocusZone, we only want a Tab key to navigate.
 */
const chatMessageBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  keyActions: {
    root: {
      // prevents default FocusZone behavior, in this case, prevents using arrow keys as navigation (we only want a Tab key to navigate)
      preventDefault: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
})

export default chatMessageBehavior
