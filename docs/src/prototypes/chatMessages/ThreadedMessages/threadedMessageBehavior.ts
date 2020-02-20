import {
  chatMessageBehavior,
  Accessibility,
  FocusZoneTabbableElements,
  ChatMessageBehaviorProps,
} from '@fluentui/react'
import * as keyboardKey from 'keyboard-key'

const threadedMessageBehavior: Accessibility<ChatMessageBehaviorProps> = props => {
  const behaviorData = chatMessageBehavior(props)

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    handleTabKey: FocusZoneTabbableElements.none,
    shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
    isCircularNavigation: false,
  }

  behaviorData.keyActions = {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  }

  return behaviorData
}

export default threadedMessageBehavior
