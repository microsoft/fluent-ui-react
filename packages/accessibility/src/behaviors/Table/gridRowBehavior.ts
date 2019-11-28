import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'
import * as keyboardKey from 'keyboard-key'
/**
 * @description
 * Sets the message to be a focusable element.
 * Adds a vertical circular focus zone navigation where a user navigates using a Tab key.
 * Adds a key action which prevents up and down arrow keys from navigating in FocusZone, we only want a Tab key to navigate.
 */
const gridRowBehavior: Accessibility = props => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
      role: 'row',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
      direction: FocusZoneDirection.horizontal,
    },
  },
  keyActions: {
    root: {
      unsetRowTabbable: {
        keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: true }],
      },
    },
  },
})

export default gridRowBehavior
