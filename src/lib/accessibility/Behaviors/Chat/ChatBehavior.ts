import { Accessibility, FocusZoneMode } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneDirection } from '../../FocusZone'

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
      defaultActiveElement: '*[chat-focus-zone] > * > *:last-child',
      'chat-focus-zone': '',
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
