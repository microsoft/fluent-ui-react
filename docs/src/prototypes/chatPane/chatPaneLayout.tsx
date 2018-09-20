import * as React from 'react'
import { Layout } from '@stardust-ui/react'
import { IChat } from './data/interfaces'
import ChatPaneHeader from './chatPaneHeader'
import ChatPaneContainer from './chatPaneContent'
import { ComposeMessage } from './composeMessage'

export interface IChatPaneLayoutProps {
  chat: IChat
}

const ChatPaneLayout: React.SFC<IChatPaneLayoutProps> = ({ chat }: IChatPaneLayoutProps) => (
  <Layout
    vertical
    start={<ChatPaneHeader chat={chat} />}
    main={<ChatPaneContainer chat={chat} />}
    end={<ComposeMessage />}
    styles={{ backgroundColor: '#f3f2f1', height: '100%' }}
  />
)

export default ChatPaneLayout
