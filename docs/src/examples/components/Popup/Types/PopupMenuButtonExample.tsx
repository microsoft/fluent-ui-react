import React from 'react'
import { Button, Popup, Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleVertical = <Menu defaultActiveIndex={0} items={items} vertical />

const PopupMenuButtonExampleShorthand = () => (
  <Popup
    basic
    position="bottom start"
    trigger={<Button content="Menu button" />}
    content={MenuExampleVertical}
  />
)

export default PopupMenuButtonExampleShorthand
