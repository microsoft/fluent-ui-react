import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
  },
  {
    key: 'review',
    content: 'Reviews',
  },
  {
    wrapper: { design: { padding: '20px', background: 'red' } },
    key: 'events',
    content: 'Upcoming Events',
    styles: { background: 'pink' },
  },
]

const MenuExample = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExample
