import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'
import gridHeaderRowBehavior from './gridHeaderRowBehavior'
import gridRowBehavior from './gridRowBehavior'

/**
 * @specification
 * Adds role='grid'.
 * Embeds component into FocusZone.
 * Focus can be moved inside a child component with embeded inner FocusZone by pressing a specified key.
 * Provides arrow key navigation in vertical direction.
 * Focused active element of the component is reset when TAB from the component.
 * Triggers 'focus' action with 'Escape' on 'root'.
 * Applies 'gridHeaderRowBehavior' for 'headerRow' child component.
 * Applies 'gridRowBehavior' for 'row' child component.
 */

const gridNestedBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.ArrowRight,
      direction: FocusZoneDirection.vertical,
      shouldResetActiveElementWhenTabFromZone: true,
    },
  },
  keyActions: {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
  childBehaviors: {
    headerRow: gridHeaderRowBehavior,
    row: gridRowBehavior,
  },
})

export default gridNestedBehavior
