import { Accessibility } from '../../types'
const gridCellBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'gridcell',
    },
  },
})

export default gridCellBehavior
