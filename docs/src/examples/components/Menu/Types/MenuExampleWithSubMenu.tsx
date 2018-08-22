import * as React from 'react'
import { Menu, MenuBarBehavior } from '@stardust-ui/react'

const submenuStyle = {
  position: 'absolute',
  top: '100%',
  width: '100px',
  left: 0,
}

const menuStyle = {
  width: '100px',
  position: 'relative',
}

const submenu1 = {
  vertical: true,
  style: submenuStyle,
  items: [
    { key: 'a', content: 'New' },
    { key: 'b', content: 'Open' },
    { key: 'c', content: 'Edit' },
  ],
}

const submenu2 = {
  vertical: true,
  style: submenuStyle,
  items: [
    { key: 'a', content: 'New' },
    { key: 'b', content: 'Open' },
    { key: 'c', content: 'Edit' },
  ],
}

const submenu3 = {
  vertical: true,
  style: submenuStyle,
  items: [{ key: 'h', content: 'Font' }, { key: 'i', content: 'Text' }],
}

const items = [
  { key: 'file', content: <span>File ▾</span>, submenu: submenu1, style: menuStyle },
  { key: 'edit', content: <span>Edit ▾</span>, submenu: submenu2, style: menuStyle },
  { key: 'format', content: <span>Format ▾</span>, submenu: submenu3, style: menuStyle },
  { key: 'help', content: 'Help', style: menuStyle },
]

class MenuExampleWithSubMenu extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} accessibility={MenuBarBehavior} />
  }
}

export default MenuExampleWithSubMenu
