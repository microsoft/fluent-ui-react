import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Disabled Item', disabled: true },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleDisabled = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleDisabled
