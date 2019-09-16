import * as React from 'react'
import { Avatar, Chat, Divider } from '@stardust-ui/react'

const ChatExample = () => (
  <Chat>
    <Chat.Item contentPosition="end">
      <Chat.Message author="John Doe" content="Hello" timestamp="Yesterday, 10:15 PM" mine />
    </Chat.Item>

    <Chat.Item contentPosition="end" attached>
      <Chat.Message content="I'm back!" author="John Doe" mine />
    </Chat.Item>

    <Chat.Item contentPosition="end" attached="bottom">
      <Chat.Message
        content={
          <div>
            What do you think about <a href="#">www.goodFood.com</a>?
          </div>
        }
        author="John Doe"
        mine
      />
    </Chat.Item>

    <Chat.Item attached="top">
      <Chat.Gutter>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>
      <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
    </Chat.Item>

    <Chat.Item attached>
      <Chat.Gutter>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>
      <Chat.Message content="Looks good!" />
    </Chat.Item>

    <Chat.Item attached="bottom">
      <Chat.Gutter>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>

      <Chat.Message
        content={
          <div>
            I also like <a href="#">www.goodFood2.com</a>.
          </div>
        }
      />
    </Chat.Item>

    <Chat.Item contentPosition="end">
      <Chat.Message
        content="Would you like to grab lunch there?"
        author="John Doe"
        timestamp="Yesterday, 10:16 PM"
        mine
      />
    </Chat.Item>

    <Chat.Item>
      <Chat.Gutter>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>

      <Chat.Message
        content="Sure! Let's try it."
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
      />
    </Chat.Item>

    <Chat.Item>
      <Divider content="Today" color="brand" important />
    </Chat.Item>

    <Chat.Item contentPosition="end">
      <Chat.Message content="Ok, let's go." author="John Doe" timestamp="Today, 11:15 PM" mine />
    </Chat.Item>
  </Chat>
)

export default ChatExample
