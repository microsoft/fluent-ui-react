import { Accessibility } from '../../types'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'

const tableVerticalNavigationBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.vertical,
    },
  },
})

export default tableVerticalNavigationBehavior
