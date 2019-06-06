import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.vertical,
    },
  },
})

export default treeBehavior
