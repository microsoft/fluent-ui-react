import React from 'react'
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

const MenuExampleWithSubMenu = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleWithSubMenu
