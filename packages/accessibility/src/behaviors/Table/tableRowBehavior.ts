import { Accessibility } from '../../types'
/**
 * @description
 * Behavior for a table row - a cell in a tabular container. See https://www.w3.org/TR/wai-aria-1.1/#row
 * @specification
 * Adds role='row'.
 */
const tableCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'row',
    },
  },
})

export default tableCellBehavior
