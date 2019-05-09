import { Accessibility, FocusZoneMode } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Sets the message to be a focusable element.
 * Adds a vertical circular focus zone navigation where a user navigates using a Tab key.
 * Adds a key action which prevents up and down arrow keys from navigating in FocusZone, we only want a Tab key to navigate.
 */
const tableHeaderRowNestedNavigationBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.horizontal,
      shouldFocusInnerElementWhenReceivedFocus: true,
    },
  },
})

export default tableHeaderRowNestedNavigationBehavior
