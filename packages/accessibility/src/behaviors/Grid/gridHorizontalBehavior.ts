import { Accessibility } from '../../types'
import { FocusZoneDirection } from '../../focusZone/types'

/**
 * @description
 * Provides navigation between focusable children of Grid component with arrow keys in horizontal direction (based on DOM order).
 * Right/Down arrow keys move to next item, Up/Left  arrow keys to previous item. Right and Left arrow keys are switched in RTL mode.
 *
 * @specification
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 */
const gridHorizontalBehavior: Accessibility = () => ({
  attributes: {},
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
})

export default gridHorizontalBehavior
