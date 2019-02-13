import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'format',
    icon: {
      name: 'format',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Format Tool',
  },
  {
    key: 'paperclip',
    icon: {
      name: 'paperclip',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Paperclip Tool',
  },
  {
    key: 'emoji',
    icon: {
      name: 'emoji',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Emoji Tool',
  },
  {
    key: 'giphy',
    icon: {
      name: 'giphy',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Giphy tool',
  },
  {
    key: 'sticker',
    icon: {
      name: 'sticker',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Sticker Tool',
  },
  {
    key: 'meetup',
    icon: {
      name: 'video-camera-emphasis',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Meetup Tool',
  },
  {
    key: 'book',
    icon: {
      name: 'book',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Book Tool',
  },
  {
    key: 'menuButton',
    icon: {
      name: 'more',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        {
          key: '1',
          content: 'item1 123 super long text that should wrap after 330px.',
          icon: {
            name: 'bookmark',
            variables: { outline: true },
          },
        },
        {
          key: '2',
          content: 'item2',
          icon: {
            name: 'mark-as-unread',
            variables: { outline: true },
          },
        },
        {
          key: '3',
          content: 'item3',
          icon: {
            name: 'translation',
            variables: { outline: true },
          },
        },
        {
          key: '4',
          content: 'item3',
          icon: {
            name: 'trash-can',
            variables: { outline: true },
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
        accessibility={toolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarShorthand
