import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', content: 'Home', endIcon: 'home' },
  { key: 'users', content: 'Users', endIcon: 'users' },
  { key: 'search', content: 'Search', endIcon: 'search' },
]

const MenuExampleWithEndIconsVertical = () => <Menu vertical defaultActiveIndex={0} items={items} />

export default MenuExampleWithEndIconsVertical
