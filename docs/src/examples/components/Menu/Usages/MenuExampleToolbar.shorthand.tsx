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
      circular: true,
      size: 'small',
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
        },
        {
          key: '3',
          content: 'item3',
          menu: { items: [{ key: '1', content: 'item3.1' }, { key: '2', content: 'item3.2' }] },
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
