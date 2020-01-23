import { Accessibility } from '../../types'
import { FocusZoneDirection } from '../../focusZone/types'

/**
 * @description
 * Provides navigation between focusable children of Grid component with arrow keys in 4 directions.
 *
 * @specification
 * Provides arrow key navigation in bidirectional direction.
 */
const gridBehavior: Accessibility = () => ({
  attributes: {},
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
})

export default gridBehavior
