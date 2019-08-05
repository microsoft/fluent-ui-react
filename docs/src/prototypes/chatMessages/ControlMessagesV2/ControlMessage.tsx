import * as React from 'react'
// import { List, ListItemProps, Text } from '@stardust-ui/react'
import {
  Chat,
  ChatItemProps,
  ChatMessageProps,
  chatBehavior,
  Accessibility,
} from '@stardust-ui/react'

const acceessibilityBehavior: Accessibility<any> = props => {
  const behaviorData = chatBehavior(props)

  behaviorData.focusZone = {
    mode: behaviorData.focusZone.mode,
    props: {
      ...behaviorData.focusZone.props,
      shouldFocusOnMount: true,
      defaultTabbableElement: undefined,
    },
  }
  return behaviorData
}

interface ControlMessageProps {
  expanded: boolean
  items: ChatItemProps[]
}
class ControlMessage extends React.Component<ControlMessageProps> {
  render() {
    const { expanded, items } = this.props
    return expanded ? (
      <Chat items={items} accessibility={acceessibilityBehavior} />
    ) : (
      <Chat.Message {...items[0].message as ChatMessageProps} />
    )
  }
}

export default ControlMessage
