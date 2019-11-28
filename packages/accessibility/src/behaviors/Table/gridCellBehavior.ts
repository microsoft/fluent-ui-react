import { Accessibility } from '../../types'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes'

const gridCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'gridcell',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
})

export default gridCellBehavior
