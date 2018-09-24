import React from 'react'
import { ContextualMenu, Avatar } from '@stardust-ui/react'

const menuTree = [
  {
    key: 'menuItem0',
    icon: 'search',
    title: 'Show in channel',
  },
  {
    key: 'menuItem1',
    title: 'Show in channel',
  },
  {
    key: 'menuItem2',
    title: 'Submenu 1',
    submenuitems: [
      {
        key: 'subItem0',
        title: 'Subitem 0',
        submenuitems: [
          {
            key: 'subItem0',
            title: 'Subitem 0',
          },
          {
            key: 'subItem1',
            title: 'Subitem 1',
          },
        ],
      },
      {
        key: 'subItem1',
        title: 'Subitem 1',
      },
    ],
  },
  {
    key: 'menuItem3',
    title: 'Submenu 2',
    submenuitems: [
      {
        key: 'subItem0',
        title: 'Subitem 0',
      },
      {
        key: 'subItem1',
        title: 'Subitem 1',
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
