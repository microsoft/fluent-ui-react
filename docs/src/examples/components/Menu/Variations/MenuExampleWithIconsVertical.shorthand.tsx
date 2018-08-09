import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', content: 'Home', icon: 'home' },
  { key: 'users', content: 'Users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

class MenuExampleWithIconsVerticalShorthand extends React.Component {
  render() {
    return <Menu vertical defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithIconsVerticalShorthand
