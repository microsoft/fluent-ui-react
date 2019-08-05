import * as React from 'react'
import { Chat, ChatMessageProps, Ref } from '@stardust-ui/react'

interface ControlMessageProps {
  messageFocused?: boolean
  message: ChatMessageProps
}
class ControlMessage extends React.Component<ControlMessageProps> {
  messageRef = React.createRef<HTMLElement>()

  componentDidMount() {
    if (this.props.messageFocused && this.messageRef) {
      this.messageRef.current.focus()
    }
  }

  render() {
    return (
      <Ref innerRef={this.messageRef}>
        <Chat.Message {...this.props.message} tabIndex={-1} styles={{ padding: 0 }} />
      </Ref>
    )
  }
}

export default ControlMessage
