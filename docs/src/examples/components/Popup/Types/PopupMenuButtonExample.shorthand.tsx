import React from 'react'
import { Button, Popup, Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleVertical = <Menu defaultActiveIndex={0} items={items} vertical />

const PopupMenuButtonExample = () => (
  <Popup
    basic
    position="below"
    trigger={<Button icon="expand" content="Menu button" />}
    content={MenuExampleVertical}
  />
)

export default PopupMenuButtonExample
