import * as React from 'react'
import { Menu, MenuShorthandKinds } from '@stardust-ui/react'

const items = [
  {
    key: 'edit',
    content: 'Edit',
    icon: {
      name: 'edit',
      variables: { outline: true },
    },
  },
  {
    key: 'delete',
    content: 'Delete',
    icon: {
      name: 'trash-can',
      variables: { outline: true },
    },
  },
  { key: 'divider', kind: 'divider' as MenuShorthandKinds },
  {
    key: 'unread',
    content: 'Mark as unread',
    icon: {
      name: 'mark-as-unread',
      variables: { outline: true },
    },
  },
  {
    key: 'translate',
    content: 'Translate',
    icon: {
      name: 'translation',
      variables: { outline: true },
    },
  },
  {
    key: 'link',
    content: 'Copy link',
    icon: {
      name: 'link',
      variables: { outline: true },
    },
  },
]

const MenuExampleVerticalWithIcons = () => <Menu defaultActiveIndex={0} items={items} vertical />

export default MenuExampleVerticalWithIcons
