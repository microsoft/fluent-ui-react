import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', content: 'Home', icon: 'home' },
  { key: 'users', content: 'Users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

class MenuExampleWithIconsShorthand extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithIconsShorthand
