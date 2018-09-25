import React from 'react'
import { ContextualMenu, Avatar } from '@stardust-ui/react'

const menuTree = [
  {
    key: 'menuItem0',
    title: 'Click for callback',
  },
  {
    key: 'menuItem1',
    title: 'Click for callback',
  },
  {
    key: 'menuItem2',
    title: 'Open Submenu 1',
    submenuitems: [
      {
        key: 'subItem0',
        title: 'Open Submenu 1.1',
        submenuitems: [
          {
            key: 'subItem0',
            title: 'Click for callback',
          },
          {
            key: 'subItem1',
            title: 'Click for callback',
          },
        ],
      },
      {
        key: 'subItem1',
        title: 'Click for callback',
      },
    ],
  },
  {
    key: 'menuItem3',
    title: 'Open Submenu 2',
    submenuitems: [
      {
        key: 'subItem0',
        title: 'Click for callback',
      },
      {
        key: 'subItem1',
        title: 'Click for callback',
      },
    ],
  },
]

const personDescription = {
  imageUrl: 'public/images/avatar/small/elliot.jpg',
  description: 'Gopal Goel',
}

const callback = () => {
  alert('Callback invoked')
}

const ContextualMenuExample = () => (
  <ContextualMenu menutree={menuTree} persondescription={personDescription} callback={callback} />
)

export default ContextualMenuExample
