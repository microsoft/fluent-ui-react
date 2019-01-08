import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'separator', kind: 'MenuSeparator' },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleKind = () => (
  <Menu defaultActiveIndex={0} items={items} vertical pointing="start" />
)

export default MenuExampleKind
