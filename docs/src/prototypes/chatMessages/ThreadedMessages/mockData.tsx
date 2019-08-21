import * as React from 'react'
import { Avatar } from '@stardust-ui/react'
import { ThreadReplyProps } from './ThreadRepliesProps'

export const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: 'like',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'more',
      icon: 'more',
      title: 'More actions',
    },
  ],
}

export const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

export const replies: ThreadReplyProps[] = [
  {
    avatar: <Avatar {...janeAvatar} />,
    content: "Sure! Let's do it",
    author: 'Joe Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: <Avatar {...janeAvatar} />,
    content: (
      <div>
        Amazing idea! What do you think about this place <a href="/">Letna beer garden</a>?
      </div>
    ),
    author: 'Jane Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: <Avatar {...janeAvatar} />,
    content: 'I am for any place!',
    author: 'Harry Potter',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: <Avatar {...janeAvatar} />,
    content: 'Yay! Finally party!',
    author: 'Bob Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
]
