import { Accessibility, FocusZoneMode } from '../../types'
import { ListBehaviorProps } from './listBehavior'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Adds role='menu'.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 */
const navigableListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
})

export default navigableListBehavior
