import { Accessibility } from '../../types'
import tableCellBehavior from './tableCellBehavior'
import tableHeaderCellBehavior from './tableHeaderCellBehavior'

/**
 * @description
 * Behavior for a table row - a cell in a tabular container. See https://www.w3.org/TR/wai-aria-1.1/#row
 * @specification
 * Adds role='row'.
 */
const tableRowBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'row',
    },
  },
  childBehaviors: {
    cell: props.header ? tableHeaderCellBehavior : tableCellBehavior,
  },
})

export default tableRowBehavior
