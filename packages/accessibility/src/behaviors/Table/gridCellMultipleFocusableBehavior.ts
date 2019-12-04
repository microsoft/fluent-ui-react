import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * @specification
 * Adds role='gridcell'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in bidirectional direction.
 * Triggers 'focusCell' action with 'Escape' on 'root'.
 */
const gridCellMultipleFocusableBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'gridcell',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
  keyActions: {
    root: {
      focusCell: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default gridCellMultipleFocusableBehavior
