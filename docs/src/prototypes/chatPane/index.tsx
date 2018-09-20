import * as React from 'react'
import { Provider } from '@stardust-ui/react'

import ChatPaneLayout from './ChatPaneLayout'
import { getChatMock } from './data/dataMock'

const chatMock = getChatMock({ msgCount: 50, userCount: 4 })

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
    <ChatPaneLayout chat={chatMock.chat} />
  </Provider>
)
