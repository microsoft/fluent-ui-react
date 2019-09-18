import { createComponent } from '@stardust-ui/react'
import * as React from 'react'

type ChatBodyProps = {
  children?: React.ReactNode
}

const ChatBody = createComponent<ChatBodyProps>({
  className: 'ui-chat__body',
  displayName: 'ChatBody',
  render: props => {
    const { children, stardust } = props

    return <div className={stardust.classes.root}>{children}</div>
  },
})

export default ChatBody
