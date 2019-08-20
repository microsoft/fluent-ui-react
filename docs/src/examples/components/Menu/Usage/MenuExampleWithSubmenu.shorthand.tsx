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
          menu: [{ key: '1', content: 'item2.1' }, { key: '2', content: 'item2.2' }],
        },
        {
          key: '3',
          content: 'item3',
          menu: [{ key: '1', content: 'item3.1' }, { key: '2', content: 'item3.2' }],
        },
      ],
    },
  },
  {
    key: 'review',
    content: 'Reviews',
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2 with longer content',
          menu: [{ key: '1', content: 'item2.1' }, { key: '2', content: 'item2.2' }],
        },
        {
          key: '3',
          content: 'item3 with a very unreasonably long content that must wrap',
          menu: [{ key: '1', content: 'item3.1' }, { key: '2', content: 'item3.2' }],
        },
      ],
    },
  },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleWithSubMenu = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleWithSubMenu
