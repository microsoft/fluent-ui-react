import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

class MenuExampleVerticalShorthand extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} vertical />
  }
}

export default MenuExampleVerticalShorthand
