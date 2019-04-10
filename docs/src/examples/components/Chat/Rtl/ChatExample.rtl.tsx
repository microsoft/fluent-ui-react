import * as React from 'react'
import { Avatar, Chat } from '@stardust-ui/react'

const items = [
  {
    message: {
      content: (
        <Chat.Message
          content="مرحبا، يمكننا الحديث؟ من المهم!"
          author="John Doe"
          timestamp="بالأمس ، 10:15"
          mine
        />
      ),
    },
    contentPosition: 'end',
    key: 'message-id-1',
  },
  {
    gutter: {
      content: (
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'check' }}
        />
      ),
    },
    message: {
      content: (
        <Chat.Message
          content="تأكد منJohn. دعونا جدولة اجتماع."
          author="Jane Doe"
          timestamp="بالأمس ، 10:15"
        />
      ),
    },
    attached: 'top',
    key: 'message-id-2',
  },
]

const ChatExampleRtl = () => <Chat items={items} />

export default ChatExampleRtl
