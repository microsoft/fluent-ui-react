import * as React from 'react'
import { ThreadReplyProps } from './ThreadReplies'

export const actionMenu = {
  iconOnly: true,
  open: true,
  items: [
    {
      key: 'more',
      icon: 'more',
      title: 'More actions',
    },
    {
      key: 'like',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like2',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like3',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like4',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like5',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like6',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like7',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like8',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'like9',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'more2',
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
    avatar: janeAvatar,
    content: "Sure! Let's do it",
    author: 'Joe Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: janeAvatar,
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
    avatar: janeAvatar,
    content: 'I am for any place!',
    author: 'Harry Potter',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
  {
    avatar: janeAvatar,
    content: 'Yay! Finally party!',
    author: 'Bob Doe',
    timestamp: 'Yesterday, 10:15 PM',
    actionMenu,
  },
]

export const toolbarItems = [
  {
    key: 'bold',
    icon: {
      name: 'bold',
      outline: true,
    },
  },
  {
    key: 'italic',
    icon: {
      name: 'italic',
      outline: true,
    },
  },
  {
    key: 'underline',
    icon: {
      name: 'underline',
      outline: true,
    },
  },
  {
    key: 'smile',
    icon: {
      name: 'smile',
      outline: true,
    },
  },
  {
    key: 'picture',
    icon: {
      name: 'picture',
      outline: true,
    },
  },
  {
    key: 'calendar',
    icon: {
      name: 'calendar',
      outline: true,
    },
  },
]
