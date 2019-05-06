import { Accessibility, FocusZoneMode } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneDirection } from '../../FocusZone'

const tableNestedNavigationBehavior: Accessibility = (props: any) => ({
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

export default tableNestedNavigationBehavior
