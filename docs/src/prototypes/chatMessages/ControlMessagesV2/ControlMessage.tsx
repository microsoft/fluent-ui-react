import * as React from 'react'
// import { List, ListItemProps, Text } from '@stardust-ui/react'
import {
  Chat,
  ChatItemProps,
  ChatMessageProps,
  chatBehavior,
  Accessibility,
  Ref,
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
  focusMessage?: boolean
}
class ControlMessage extends React.Component<ControlMessageProps> {
  messageRef = React.createRef<HTMLElement>()

  componentDidUpdate() {
    const { expanded, focusMessage } = this.props

    if (!expanded && focusMessage && this.messageRef) {
      this.messageRef.current.focus()
    }
  }

  render() {
    const { expanded, items } = this.props
    return expanded ? (
      <Chat items={items} accessibility={acceessibilityBehavior} />
    ) : (
      <Ref innerRef={this.messageRef}>
        <Chat.Message {...(items[0].message as ChatMessageProps)} tabIndex={-1} />
      </Ref>
    )
  }
}

export default ControlMessage
