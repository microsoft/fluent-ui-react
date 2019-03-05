import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'format',
    icon: {
      name: 'format',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Format Tool',
  },
  {
    key: 'paperclip',
    icon: {
      name: 'paperclip',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Paperclip Tool',
  },
  {
    key: 'emoji',
    icon: {
      name: 'emoji',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Emoji Tool',
  },
  {
    key: 'giphy',
    icon: {
      name: 'giphy',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Giphy tool',
  },
  {
    key: 'sticker',
    icon: {
      name: 'sticker',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Sticker Tool',
  },
  {
    key: 'meetup',
    icon: {
      name: 'video-camera-emphasis',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Meetup Tool',
  },
  {
    key: 'book',
    icon: {
      name: 'book',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Book Tool',
  },
  {
    key: 'menuButton2',
    icon: {
      name: 'more',
      outline: true,
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        {
          key: '5',
          content: 'item1',
          icon: {
            name: 'bookmark',
            outline: true,
          },
        },
        {
          key: 'divider',
          kind: 'divider',
        },
        {
          key: '6',
          content: 'item2',
          icon: {
            name: 'mark-as-unread',
            outline: true,
          },
        },
        {
          key: '7',
          content: 'item3',
          icon: {
            name: 'translation',
            outline: true,
          },
        },
        {
          key: 'divider2',
          kind: 'divider',
        },
        {
          key: '8',
          content: 'item3',
          icon: {
            name: 'trash-can',
            outline: true,
          },
        },
      ],
    },
  },
]

class MenuExampleToolbarShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        primary
        accessibility={toolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarShorthand
