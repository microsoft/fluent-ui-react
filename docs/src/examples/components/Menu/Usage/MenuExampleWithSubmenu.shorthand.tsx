import * as React from 'react'
import { Menu } from '@fluentui/react'

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
          icon: 'stardust-circle',
          content: 'item2 non augue tortor mollis',
          menu: [
            { key: '1', icon: 'stardust-circle', content: 'item2.1' },
            { key: '2', content: 'item2.2' },
          ],
        },
        {
          key: '3',
          icon: 'stardust-circle',
          content: 'item3 elementum urna varius augue ultrices gravida malesuada fames',
          menu: [
            { key: '1', icon: 'stardust-circle', content: 'item3.1' },
            { key: '2', content: 'item3.2' },
          ],
        },
      ],
    },
  },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleWithSubMenu = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleWithSubMenu
