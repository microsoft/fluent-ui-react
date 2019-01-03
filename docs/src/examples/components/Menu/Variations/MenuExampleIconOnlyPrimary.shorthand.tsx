import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', icon: 'home' },
  { key: 'users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

const MenuExampleIconOnlyPrimary = () => (
  <Menu iconOnly defaultActiveIndex={0} items={items} primary />
)

export default MenuExampleIconOnlyPrimary
