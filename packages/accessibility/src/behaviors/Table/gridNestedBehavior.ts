import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'

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
})

export default gridNestedBehavior
