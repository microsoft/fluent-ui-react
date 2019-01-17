import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExamplePointing = () => (
  <div>
    <Menu defaultActiveIndex={2} items={items} pointing />
    <br />
    <Menu defaultActiveIndex={0} items={items} pointing="start" />
  </div>
)
export default MenuExamplePointing
