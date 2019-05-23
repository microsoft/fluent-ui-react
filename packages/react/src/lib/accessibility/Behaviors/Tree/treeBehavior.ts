import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Embeds component into FocusZone.
 * Provides arrows key navigation in vertical direction.
 * Keyboard navigation is circular.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      direction: FocusZoneDirection.vertical,
    },
  },
})

export default treeBehavior
