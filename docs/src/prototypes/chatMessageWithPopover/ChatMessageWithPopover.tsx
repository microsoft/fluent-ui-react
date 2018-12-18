import { ChatMessage } from '@stardust-ui/react'

import * as React from 'react'
import cx from 'classnames'
import Popover from './Popover'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

interface ChatMessageWithPopoverProps {
  className?: string
}

interface ChatMessageWithPopoverState {
  popoverShown: boolean
}

class ChatMessageWithPopover extends React.Component<
  ChatMessageWithPopoverProps,
  ChatMessageWithPopoverState
> {
  state = {
    popoverShown: false,
  }

  changePopoverState = (value: boolean) => {
    this.state.popoverShown !== value && this.setState({ popoverShown: value })
  }

  showPopover = () => {
    this.changePopoverState(true)
  }

  handleBlur = e => {
    const shouldPreserveFocusState = e.currentTarget.contains(e.relatedTarget)
    this.changePopoverState(shouldPreserveFocusState)
  }

  render() {
    return (
      <ChatMessage
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        content={{
          content: (
            <div>
              <Popover className="actions" />
              <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
            </div>
          ),
        }}
        avatar={janeAvatar}
        onFocus={this.showPopover}
        onBlur={this.handleBlur}
        onMouseEnter={this.showPopover}
        onMouseLeave={this.handleBlur}
        className={cx(this.props.className, this.state.popoverShown ? 'popover-shown' : '')}
      />
    )
  }
}

export default ChatMessageWithPopover
