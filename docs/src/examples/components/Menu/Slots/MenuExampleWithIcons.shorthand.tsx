import * as React from 'react'
import { Menu } from '@fluentui/react'

const items = [
  { key: 'onedrive', icon: { name: 'onedrive' } },
  { key: 'star', icon: { name: 'star' } },
  { key: 'search', icon: { name: 'search' } },
]

const MenuExampleWithIcons = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleWithIcons
