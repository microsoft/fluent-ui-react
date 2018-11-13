import React from 'react'
import { Menu, Provider } from '@stardust-ui/react'

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

const MenuExampleVerticalWithSubmenu = () => (
  <Provider
    theme={{
      componentStyles: {
        Menu: {
          root: {
            zIndex: 1000,
          },
        },
      },
    }}
  >
    <Menu defaultActiveIndex={0} vertical items={items} />
  </Provider>
)

export default MenuExampleVerticalWithSubmenu
