import { MenuButton, Menu } from '@stardust-ui/react'
import React from 'react'

const menuItems = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuButtonExample extends React.Component {
  render() {
    return (
      <MenuButton menuItems={menuItems}>
        Menu button <span aria-hidden="true">▾</span>
      </MenuButton>
    )
  }
}

export default MenuButtonExample
