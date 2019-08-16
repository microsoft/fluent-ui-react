import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'onedrive', icon: 'onedrive' },
  { key: 'star', icon: 'star' },
  { key: 'search', icon: 'search' },
]

const MenuExampleIconOnly = () => <Menu iconOnly defaultActiveIndex={0} items={items} />

export default MenuExampleIconOnly
