import { Accessibility, FocusZoneMode } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'

const ChatBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
      //   onBeforeFocus: child => {
      //     console.error('OUTER onBeforeFocus', child.nodeName)
      //     return child.parentElement.parentElement.dataset && !!child.parentElement.parentElement.dataset.focuszoneId
      //   },
      preventDefaultWhenHandled: true,
      doNotAllowFocusEventToPropagate: true,
      //   isInWrapMode: true,
      //   style: { display: 'flex' },
    },
  },
}

export default ChatBehavior
