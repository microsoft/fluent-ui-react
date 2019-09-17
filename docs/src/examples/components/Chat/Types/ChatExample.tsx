import { Avatar, Chat, Divider } from '@stardust-ui/react'
import * as React from 'react'

const ChatExample = () => (
  <Chat>
    <Chat.Item attached="top" contentPosition="end">
      <Chat.Message attached="top" position="end" mine>
        <Chat.Author attached="top" mine>
          John Doe
        </Chat.Author>
        <Chat.Timestamp attached="top" mine>
          Yesterday, 10:15 PM
        </Chat.Timestamp>
        <Chat.Content>Hello</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item attached contentPosition="end">
      <Chat.Message attached position="end" mine>
        <Chat.Author attached mine>
          John Doe
        </Chat.Author>
        <Chat.Timestamp attached mine>
          Yesterday, 10:15 PM
        </Chat.Timestamp>
        <Chat.Content>I'm back!</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item attached="bottom" contentPosition="end">
      <Chat.Message attached="bottom" position="end" mine>
        <Chat.Author attached="bottom" mine>
          John Doe
        </Chat.Author>
        <Chat.Timestamp attached="bottom" mine>
          Yesterday, 10:15 PM
        </Chat.Timestamp>
        <Chat.Content>
          <div>
            What do you think about <a href="#">www.goodFood.com</a>?
          </div>
        </Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item attached="top">
      <Chat.Gutter attached="top">
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>
      <Chat.Message attached="top">
        <Chat.Author attached="top">Jane Doe</Chat.Author>
        <Chat.Timestamp attached="top">Yesterday, 10:15 PM</Chat.Timestamp>
        <Chat.Content>Hi</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item attached>
      <Chat.Gutter attached>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>
      <Chat.Message attached>
        <Chat.Author attached>Jane Doe</Chat.Author>
        <Chat.Timestamp attached>Yesterday, 10:15 PM</Chat.Timestamp>
        <Chat.Content>Looks good!</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item attached="bottom">
      <Chat.Gutter attached="bottom">
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>

      <Chat.Message attached="bottom">
        <Chat.Author attached="bottom">Jane Doe</Chat.Author>
        <Chat.Timestamp attached="bottom">Yesterday, 10:15 PM</Chat.Timestamp>
        <Chat.Content>
          <div>
            I also like <a href="#">www.goodFood2.com</a>.
          </div>
        </Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item contentPosition="end">
      <Chat.Message position="end" mine>
        <Chat.Author mine>John Doe</Chat.Author>
        <Chat.Timestamp mine>Yesterday, 10:16 PM</Chat.Timestamp>
        <Chat.Content>Would you like to grab lunch there?</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item>
      <Chat.Gutter>
        <Avatar
          image="public/images/avatar/small/ade.jpg"
          status={{ color: 'green', icon: 'stardust-checkmark' }}
        />
      </Chat.Gutter>

      <Chat.Message>
        <Chat.Author>Jane Doe</Chat.Author>
        <Chat.Timestamp>Yesterday, 10:16 PM</Chat.Timestamp>
        <Chat.Content>Sure! Let's try it.</Chat.Content>
      </Chat.Message>
    </Chat.Item>

    <Chat.Item>
      <Divider content="Today" color="brand" important />
    </Chat.Item>

    <Chat.Item contentPosition="end">
      <Chat.Message position="end" mine>
        <Chat.Author mine>John Doe</Chat.Author>
        <Chat.Timestamp mine>Today, 11:15 PM</Chat.Timestamp>
        <Chat.Content>Ok, let's go.</Chat.Content>
      </Chat.Message>
    </Chat.Item>
  </Chat>
)

export default ChatExample
