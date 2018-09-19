import { Accessibility, FocusZoneMode } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneDirection } from '../../FocusZone'

const CHAT_FOCUSZONE_ATTRIBUTE = 'chat-focuszone'

const ChatBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.ArrowRight,
      direction: FocusZoneDirection.vertical,
      defaultTabbableElement: `[${CHAT_FOCUSZONE_ATTRIBUTE}] > * > *:last-child`, // select last chat message by default
      [CHAT_FOCUSZONE_ATTRIBUTE]: '', // allows querying the default active element
    },
  },
  keyActions: {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
}

export default ChatBehavior
