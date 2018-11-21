import * as React from 'react'
import { Layout } from '@stardust-ui/react'
import { ChatData } from './services'

import ChatPaneHeader from './chatPaneHeader'
import ChatPaneContainer from './chatPaneContent'
import ComposeMessage from './composeMessage'

export interface ChatPaneLayoutProps {
  chat: ChatData
}

const ChatPaneLayout: React.SFC<ChatPaneLayoutProps> = ({ chat }: ChatPaneLayoutProps) => (
  <Layout
    vertical
    start={<ChatPaneHeader chat={chat} />}
    main={<ChatPaneContainer chat={chat} />}
    end={<ComposeMessage />}
    styles={{
      backgroundColor: '#f3f2f1',
      left: 0,
      paddingLeft: '250px',
      width: '100%',
      height: '100%',
      position: 'fixed',
    }}
  />
)

export default ChatPaneLayout
