import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'
import * as keyboardKey from 'keyboard-key'
import gridCellBehavior from './gridCellBehavior'

/**
 * @specification
 * Adds role='row'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 * Embeds component into FocusZone.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Provides arrow key navigation in horizontal direction.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'unsetRowTabbable' action using 'shiftKey' + 'Tab' key on 'root'.
 * Applies 'gridCellBehavior' for 'cell' child component.
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
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
    },
  },
  childBehaviors: {
    cell: gridCellBehavior,
  },
})

export default gridRowBehavior
