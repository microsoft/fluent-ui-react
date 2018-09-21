import React from 'react'
import { ContextualMenu } from '@stardust-ui/react'

const items = [
  {
    key: 'personDescription',
    content: <div>Gopal Goel</div>,
  },
  {
    key: 'menuItem1',
    content: 'Show in channel',
  },
  {
    key: 'menuItem2',
    content: 'Submenu 1',
    submenuItems: [
      {
        key: 'subItem0',
        content: 'Subitem 0',
      },
      {
        key: 'subItem1',
        content: 'Subitem 1',
      },
    ],
  },
  {
    key: 'menuItem3',
    content: 'Submenu 2',
    submenuItems: [
      {
        key: 'subItem0',
        content: 'Subitem 0',
      },
      {
        key: 'subItem1',
        content: 'Subitem 1',
      },
    ],
  },
]

const ContextualMenuExample = () => <ContextualMenu items={items} />

export default ContextualMenuExample
