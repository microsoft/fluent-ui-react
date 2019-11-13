import { Accessibility } from '../../types'
/**
 * @description
 * Basic behavior for static table - a static tabular structure containing one or more rows that each contain one or more cells; it is not an interactive widget
 * @specification
 * Adds role='table'.
 * Adds role 'row' to 'row' slot.
 */
const tableBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'table',
    },
    row: {
      role: 'row',
    },
  },
})

export default tableBehavior
