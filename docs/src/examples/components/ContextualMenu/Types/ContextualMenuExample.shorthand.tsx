import React from 'react'
import { ContextualMenu } from '@stardust-ui/react'

const menuTree = [
  {
    key: 'menuItem0',
    persondescription: {
      imageUrl: 'public/images/avatar/small/elliot.jpg',
      description: 'Gopal Goel',
    },
  },
  {
    key: 'menuItem1',
    icon: 'user',
    title: 'Click for callback',
  },
  {
    key: 'menuItem2',
    icon: 'search',
    title: 'Click for callback',
    divider: true,
  },
  {
    key: 'menuItem3',
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
    key: 'menuItem4',
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
