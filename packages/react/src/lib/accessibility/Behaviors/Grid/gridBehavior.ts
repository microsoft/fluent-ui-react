import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Provides navigation between focusable children of Grid component with arrow keys in 4 directions.
 *
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
