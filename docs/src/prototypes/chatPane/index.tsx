import * as React from 'react'
import { Provider, Divider } from '@stardust-ui/react'

import ChatPaneLayout from './chatPaneLayout'
import { getChatMock } from './services'
import { pxToRem } from '../../../../src/lib'

const chatMock = getChatMock({ msgCount: 40, userCount: 6 })
const dividerSelector = `& .${Divider.className}`

export default () => (
  <Provider
    theme={{
      componentStyles: {
        Layout: {
          start: { display: 'block' },
          end: { display: 'block' },
        },
        ChatItem: {
          root: {
            [dividerSelector]: {
              marginLeft: `-${pxToRem(40)}`,
              marginRight: `-${pxToRem(40)}`,
            },
          },
        },
      },
    }}
  >
    <ChatPaneLayout chat={chatMock.chat} />
  </Provider>
)
