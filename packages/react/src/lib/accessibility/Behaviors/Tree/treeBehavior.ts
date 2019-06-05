import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Embeds component into FocusZone.
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 */
const treeBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  keyActions: {
    root: {
      expandSiblings: {
        keyCombinations: [{ keyCode: keyboardKey['*'] }],
      },
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
