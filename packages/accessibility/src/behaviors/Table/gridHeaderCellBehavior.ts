import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'

/**
 * @specification
 * Adds role='columnheader'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
const gridHeaderCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'columnheader',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
})

export default gridHeaderCellBehavior
