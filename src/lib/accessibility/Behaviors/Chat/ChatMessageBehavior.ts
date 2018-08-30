import { Accessibility, FocusZoneMode, AriaRole } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/FocusUtilities'
import * as keyboardKey from 'keyboard-key'

const ChatMessageBehavior: Accessibility = ({ wrapInFocusZone }) => ({
  attributes: {
    root: {
      role: 'presentation',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      preventDefaultWhenHandled: true,
    },
  },
  //   focusZone: !wrapInFocusZone ? {
  //     mode: FocusZoneMode.Wrap,
  //     props: {
  //     //   isCircularNavigation: true,
  //     //   role: '',
  //     //   onBeforeFocus: child => {
  //     //     console.error('INNER onBeforeFocus', child.nodeName)
  //     //     return true
  //     //     // return child.nodeName && child.nodeName.toLowerCase() == 'li'
  //     //   },
  //       style: { display: 'flex' },
  //       [IS_FOCUSABLE_ATTRIBUTE]: true,
  //       preventDefaultWhenHandled: true,
  //     //   isInWrapMode: true,
  //     //   doNotAllowFocusEventToPropagate: true,
  //     },
  //   } : undefined,
})

export default ChatMessageBehavior
