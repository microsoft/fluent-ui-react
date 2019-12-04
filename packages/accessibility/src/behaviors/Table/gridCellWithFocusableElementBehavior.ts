import { Accessibility } from '../../types'

/**
 * @description
 * @specification
 * Adds role='gridcell'.
 */

const gridCellWithFocusableElementBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'gridcell',
    },
  },
})

export default gridCellWithFocusableElementBehavior
