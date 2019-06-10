import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @specification
 * Adds role 'tree' to 'root' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' component's part.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'tree',
      'aria-labelledby': props['aria-labelledby'],
    },
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
