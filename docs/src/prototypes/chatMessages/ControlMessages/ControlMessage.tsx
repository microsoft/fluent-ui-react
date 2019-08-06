import * as React from 'react'
import { Ref, ChatMessageProps, Chat } from '@stardust-ui/react'

interface ControlMessageProps {
  focused?: boolean
  message: ChatMessageProps
}
class ControlMessage extends React.Component<ControlMessageProps> {
  messageRef = React.createRef<HTMLElement>()

  componentDidMount() {
    if (this.props.focused && this.messageRef) {
      this.messageRef.current.focus()
    }
  }

  render() {
    return (
      <Ref innerRef={this.messageRef}>
        <Chat.Message
          {...this.props.message}
          styles={{ padding: 0, marginLeft: '10px', backgroundColor: '#f3f2f1', fontSize: '14px' }}
        />
      </Ref>
    )
  }
}

export default ControlMessage
