import { Avatar, Chat, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'
import * as React from 'react'
import Menu from '../../../../src/components/Menu/Menu'
import { default as A } from './ChatWithPopover'

const actions = <Menu  accessibility={toolbarBehavior} iconOnly items={[
  { key: 'like', icon: 'like' },
  {
    key: 'more',
    icon: 'more',
    accessibility: toolbarButtonBehavior,
    'aria-label': 'more options',
    indicator: false,
    menu: {
      pills: true,
      items: [
        { key: 'bookmark', icon: 'folder', content: 'Save this message' },
        { key: 'linkify', icon: 'linkify', content: 'Copy link' },
        { key: 'translate', icon: 'translate', content: 'Translate' },
      ],
    },
  },
]} />

const items = [
  {
    contentPosition: 'end',
    message: {
      content: (
        <Chat.Message actions={actions} content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine/>
      ),
    },
    key: 'message-1',
  },
  {
    gutter: { content: <Avatar image='public/images/avatar/small/ade.jpg'/> },
    message: {
      content: <Chat.Message actions={actions} content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM"/>,
    },
    key: 'message-2',
  },
]

const ChatExample = () => <Chat items={items}/>

// export default A
export default ChatExample
