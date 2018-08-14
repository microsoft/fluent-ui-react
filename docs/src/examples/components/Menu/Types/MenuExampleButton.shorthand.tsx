import { MenuButton, Menu } from '@stardust-ui/react'
import React from 'react'

const menuItems = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuButtonExampleShorthand extends React.Component {
  render() {
    return <MenuButton menuItems={menuItems} content={<span>Menu button ▾</span>} />
  }
}

export default MenuButtonExampleShorthand
