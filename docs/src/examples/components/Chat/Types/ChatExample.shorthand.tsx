import * as React from 'react'
import { Avatar, Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const items = [
  {
    message: {
      content: (
        <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
      ),
    },
    contentPosition: 'end',
    attached: 'top',
    key: 'message-id-1',
  },
  {
    message: {
      content: (
        <Chat.Message content="I'm back!" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
      ),
    },
    contentPosition: 'end',
    attached: true,
    key: 'message-id-2',
  },
  {
    message: {
      content: (
        <Chat.Message
          content={{
            content: (
              <div>
                What do you think about <a href="#">www.goodFood.com</a>?
              </div>
            ),
          }}
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      ),
    },
    contentPosition: 'end',
    attached: 'bottom',
    key: 'message-id-3',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
    },
    attached: 'top',
    key: 'message-id-4',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: (
        <Chat.Message content="Looks good!" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
      ),
    },
    attached: true,
    key: 'message-id-5',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: (
        <Chat.Message
          content={{
            content: (
              <div>
                I also like <a href="#">www.goodFood2.com</a>.
              </div>
            ),
          }}
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    attached: 'bottom',
    key: 'message-id-6',
  },
  {
    message: {
      content: (
        <Chat.Message
          content="Would you like to grab lunch there?"
          author="John Doe"
          timestamp="Yesterday, 10:16 PM"
          mine
        />
      ),
    },
    contentPosition: 'end',
    key: 'message-id-7',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: (
        <Chat.Message
          content="Sure! Let's try it."
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    key: 'message-id-8',
  },
  {
    children: <Divider content="Today" color="brand" important />,
    key: 'message-id-9',
  },
  {
    message: {
      content: (
        <Chat.Message content="Ok, let's go." author="John Doe" timestamp="Today, 11:15 PM" mine />
      ),
    },
    contentPosition: 'end',
    key: 'message-id-10',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
