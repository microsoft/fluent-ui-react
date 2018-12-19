import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
          menu: { items: [{ key: '1', content: 'item1' }, { key: '2', content: 'item2' }] },
        },
      ],
    },
  },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleVerticalWithSubmenu = () => <Menu defaultActiveIndex={0} vertical items={items} />

export default MenuExampleVerticalWithSubmenu
