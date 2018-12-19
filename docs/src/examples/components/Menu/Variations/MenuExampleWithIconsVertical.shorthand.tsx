import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', content: 'Home', icon: 'home' },
  { key: 'users', content: 'Users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

const MenuExampleWithIconsVertical = () => <Menu vertical defaultActiveIndex={0} items={items} />

export default MenuExampleWithIconsVertical
