import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleVerticalPointingEnd = () => (
  <Menu defaultActiveIndex={0} items={items} vertical pointing="end" />
)

export default MenuExampleVerticalPointingEnd
