import { Avatar, Chat, Icon } from '@stardust-ui/react'
import * as React from 'react'

import ChatBookend from './ChatBookend'
import ChatBody from './ChatBody'
import ChatMeta from './ChatMeta'
import ProviderInIframe from './ProviderInIframe'
import theme from './theme'

const ChatInLightningDesignSystem = () => (
  <ProviderInIframe theme={theme}>
    <section role="log" style={{ marginBottom: '.75rem' }}>
      <Chat>
        <Chat.Item variables={{ isBookend: true }}>
          <ChatBookend>
            <Icon name="chat" />
            <p>
              Chat started by <b>Andy Martinez</b> • 4:58 PM
            </p>
          </ChatBookend>
        </Chat.Item>

        <Chat.Item>
          <Chat.Message>
            <Avatar as="span" aria-hidden="true" label={{ as: 'abbr' }} name="Andy Martinez" />
            <ChatBody>
              <Chat.Content>Hi, my CloudWidget only speaks French</Chat.Content>
              <ChatMeta aria-label="said Andy Martinez at 4:59 PM">
                Andy Martinez • 4:59 PM
              </ChatMeta>
            </ChatBody>
          </Chat.Message>
        </Chat.Item>

        <Chat.Item variables={{ isMine: true }}>
          <Chat.Message>
            <ChatBody>
              <Chat.Content variables={{ isMine: true }}>
                Hi Andy, thank you for contacting Widget Support. Can you please tell me what
                language you are trying to program on your CloudWidget?
              </Chat.Content>
            </ChatBody>
          </Chat.Message>
        </Chat.Item>

        <Chat.Item variables={{ isMine: true }}>
          <Chat.Message>
            <ChatBody>
              <Chat.Content variables={{ isMine: true }}>
                Have you tried turning it off and on again?
              </Chat.Content>
              <ChatMeta aria-label="said Jason Dewar at 5:02 PM">Jason Dewar • 5:02 PM</ChatMeta>
            </ChatBody>
          </Chat.Message>
        </Chat.Item>

        <Chat.Item variables={{ isBookend: true }}>
          <ChatBookend attached="bottom">
            <Icon name="end-chat" />
            <p>
              Chat ended by <b>Andy Martinez</b> • 5:30 PM
            </p>
          </ChatBookend>
        </Chat.Item>
      </Chat>
    </section>
  </ProviderInIframe>
)

export default ChatInLightningDesignSystem
