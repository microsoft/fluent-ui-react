import React from 'react'
import { ContextualMenu, Avatar } from '@stardust-ui/react'

const menuTree = [
  {
    key: 'menuItem1',
    icon: 'search',
    content: 'Show in channel',
  },
  {
    key: 'menuItem5',
    content: 'Show in channel',
  },
  {
    key: 'menuItem2',
    content: 'Submenu 1',
    submenuItems: [
      {
        key: 'subItem0',
        content: 'Subitem 0',
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

const personDescription = {
  imageUrl: 'public/images/avatar/small/matt.jpg',
  description: 'Gopal Goel',
}

const ContextualMenuExample = () => (
  <ContextualMenu menutree={menuTree} persondescription={personDescription} />
)

export default ContextualMenuExample
