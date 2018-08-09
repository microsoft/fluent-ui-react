import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'home', icon: 'home' },
  { key: 'users', icon: 'users' },
  { key: 'search', icon: 'search' },
]

class MenuExampleIconsOnlyShorthand extends React.Component {
  render() {
    return <Menu icons defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleIconsOnlyShorthand
