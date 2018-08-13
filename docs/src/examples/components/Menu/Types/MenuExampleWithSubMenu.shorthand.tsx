import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const subMenuItems1 = [
  { key: 'a', content: 'New' },
  { key: 'b', content: 'Open' },
  { key: 'c', content: 'Edit' },
]

const submenu1 = <Menu items={subMenuItems1} vertical />

const subMenuItems2 = [
  { key: 'd', content: 'Undo' },
  { key: 'e', content: 'Redo' },
  { key: 'f', content: 'Cut' },
  { key: 'g', content: 'Cope' },
]

const submenu2 = <Menu items={subMenuItems2} vertical />

const subMenuItems3 = [{ key: 'h', content: 'Font' }, { key: 'i', content: 'Text' }]

const submenu3 = <Menu items={subMenuItems3} vertical />

const items = [
  { key: 'file', content: 'File', submenu: submenu1 },
  { key: 'edit', content: 'Edit', submenu: submenu2 },
  { key: 'format', content: 'Format', submenu: submenu3 },
  { key: 'help', content: 'Help' },
]

class MenuExampleWithSubMenuShorthand extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithSubMenuShorthand
