import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'
import * as keyboardKey from 'keyboard-key'
/**
 * @description
 * Behavior for a table header cell - a cell containing header information for a column.
 * See https://www.w3.org/TR/wai-aria-1.1/#columnheader
 * @specification
 * Adds role='columnheader'.
 */
const gridHeaderCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'columnheader',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  keyActions: {
    root: {
      unsetRowNavigable: {
        keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: true }],
      },
    },
  },
})

export default gridHeaderCellBehavior
