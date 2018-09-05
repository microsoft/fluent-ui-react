import React from 'react'
import { Menu } from '@stardust-ui/react'

const menuWidthVariable = {
  menuItemWidth: 100,
}

const fileSubmenu = {
  items: [
    { key: 'new', content: 'New' },
    { key: 'open', content: 'Open' },
    { key: 'edit', content: 'Edit' },
  ],
}
const editSubmenu = {
  items: [
    { key: 'undo', content: 'Undo' },
    { key: 'redo', content: 'Redo' },
    { key: 'cut', content: 'Cut' },
    { key: 'copy', content: 'Copy' },
  ],
}
const formatSubmenu = {
  items: [{ key: 'font', content: 'Font' }, { key: 'text', content: 'Text' }],
}

const items = [
  { key: 'file', content: <span>File ▾</span>, submenu: fileSubmenu },
  { key: 'edit', content: <span>Edit ▾</span>, submenu: editSubmenu },
  { key: 'format', content: <span>Format ▾</span>, submenu: formatSubmenu },
  { key: 'help', content: 'Help' },
]

const MenuExampleWithSubmenu = () => (
  <Menu defaultActiveIndex={0} items={items} variables={menuWidthVariable} />
)

export default MenuExampleWithSubmenu
