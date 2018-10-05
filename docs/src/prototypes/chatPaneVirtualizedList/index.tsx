import * as React from 'react'
import { Provider } from '@stardust-ui/react'

import ChatPaneLayout from '../chatPane/chatPaneLayout'
import ChatPaneVirtualizedListContainer from './chatPaneVirtualizedContent'
import { getChatMock } from '../chatPane/services'

const chatMock = getChatMock({ msgCount: 40, userCount: 6 })

export default () => (
  <Provider
    theme={{
      componentStyles: {
        Layout: {
          start: { display: 'block' },
          end: { display: 'block' },
        },
      },
    }}
  >
    <ChatPaneLayout
      chat={chatMock.chat}
      chatPaneContainer={<ChatPaneVirtualizedListContainer chat={chatMock.chat} />}
    />
  </Provider>
)
