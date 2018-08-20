import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleUnderlinedPrimary = () => (
  <Menu defaultActiveIndex={0} items={items} shape="underlined" type="primary" />
)

export default MenuExampleUnderlinedPrimary
