import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    icon: {
      name: 'bookmark',
      outline: true,
    },
  },
  {
    key: 'review',
    content: 'Reviews',
    icon: {
      name: 'word',
    },
  },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleVertical = () => <Menu defaultActiveIndex={0} items={items} vertical primary />

export default MenuExampleVertical
