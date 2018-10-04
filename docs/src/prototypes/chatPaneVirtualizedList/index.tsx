import * as React from 'react'
import { Provider } from '@stardust-ui/react'

import ChatPaneVirtualizedListLayout from './chatPaneVirtualizedLayout'
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
    <ChatPaneVirtualizedListLayout chat={chatMock.chat} />
  </Provider>
)
