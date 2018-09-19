import { Accessibility, FocusZoneMode, AriaRole } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneTabbableElements, FocusZoneDirection } from '../../FocusZone'

const ChatMessageBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  keyActions: {
    root: {
      preventDefault: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }, { keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
}

export default ChatMessageBehavior
