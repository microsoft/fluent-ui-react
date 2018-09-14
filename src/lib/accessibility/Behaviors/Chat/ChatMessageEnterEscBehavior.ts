import { Accessibility, FocusZoneMode, AriaRole } from '../../interfaces'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone/focusUtilities'

const ChatMessageEnterEscBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'presentation',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
    },
  },
}

export default ChatMessageEnterEscBehavior
