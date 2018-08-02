import React from 'react'
import { Menu } from '@stardust-ui/react'

const subMenuItems = [
  { key: 'submenu1', content: 'Submenu Item1' },
  { key: 'submenu2', content: 'Submenu Item2' },
]

const submenu = <Menu items={subMenuItems} vertical />

const items = [
  { key: 'editorials', content: 'Editorials', submenu },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuExampleWithSubMenuShorthand extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} />
  }
}

export default MenuExampleWithSubMenuShorthand
