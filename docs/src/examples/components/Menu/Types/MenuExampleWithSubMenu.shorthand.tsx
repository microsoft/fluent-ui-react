import * as React from 'react'
import { Menu } from '@stardust-ui/react'

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

const subMenuItems1 = [
  { key: 'a', content: 'New' },
  { key: 'b', content: 'Open' },
  { key: 'c', content: 'Edit' },
]

const subMenuItems2 = [
  { key: 'd', content: 'Undo' },
  { key: 'e', content: 'Redo' },
  { key: 'f', content: 'Cut' },
  { key: 'g', content: 'Cope' },
]

const subMenuItems3 = [{ key: 'h', content: 'Font' }, { key: 'i', content: 'Text' }]

const submenu1 = <Menu items={subMenuItems1} vertical style={submenuStyle} />

const submenu2 = <Menu items={subMenuItems2} vertical style={submenuStyle} />

const submenu3 = <Menu items={subMenuItems3} vertical style={submenuStyle} />

const items = [
  { key: 'file', content: <span>File ▾</span>, submenu: submenu1, style: menuStyle, tabIndex: 0 },
  { key: 'edit', content: <span>Edit ▾</span>, submenu: submenu2, style: menuStyle },
  { key: 'format', content: <span>Format ▾</span>, submenu: submenu3, style: menuStyle },
  { key: 'help', content: 'Help', style: menuStyle },
]

class MenuExampleWithSubMenuShorthand extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithSubMenuShorthand
