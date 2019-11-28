import { Accessibility } from '../../types'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'

const gridCellByCellBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
})

export default gridCellByCellBehavior
