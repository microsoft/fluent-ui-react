import * as React from 'react'
import { Menu, MenuItemKindOptions } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'divider', kind: 'divider' as MenuItemKindOptions },
  { key: 'events', content: 'Upcoming Events' },
]

const MenuExampleKind = () => (
  <Menu defaultActiveIndex={0} items={items} vertical pointing="start" />
)

export default MenuExampleKind
