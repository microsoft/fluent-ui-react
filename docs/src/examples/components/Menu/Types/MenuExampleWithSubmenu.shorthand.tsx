import React from 'react'
import { Menu } from '@stardust-ui/react'

const menuWidthVariable = {
  menuItemWidth: '100px',
}

const fileSubmenu = {
  vertical: true,
  items: [
    { key: 'new', content: 'New' },
    { key: 'open', content: 'Open' },
    { key: 'edit', content: 'Edit' },
  ],
  variables: menuWidthVariable,
}
const editSubmenu = {
  vertical: true,
  items: [
    { key: 'undo', content: 'Undo' },
    { key: 'redo', content: 'Redo' },
    { key: 'cut', content: 'Cut' },
    ,
    { key: 'copy', content: 'Copy' },
  ],
  variables: menuWidthVariable,
}
const formatSubmenu = {
  vertical: true,
  items: [{ key: 'font', content: 'Font' }, { key: 'text', content: 'Text' }],
  variables: menuWidthVariable,
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
