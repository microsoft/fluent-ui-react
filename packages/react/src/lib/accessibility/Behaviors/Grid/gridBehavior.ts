import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Embeds component into FocusZone.
 * Provides arrow key navigation in bidirectional direction.
 */
const gridBehavior: Accessibility = () => ({
  attributes: {},
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
})

export default gridBehavior
