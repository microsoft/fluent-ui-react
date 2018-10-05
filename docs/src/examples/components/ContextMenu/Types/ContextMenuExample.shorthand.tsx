import React from 'react'
import { ContextMenu } from '@stardust-ui/react'

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
    iconName: 'align justify',
    title: 'Show in channel',
    divider: true,
  },
  {
    key: 'menuItem2',
    iconName: 'edit',
    title: 'Edit',
  },
  {
    key: 'menuItem3',
    iconName: 'file word',
    title: 'Open in Word',
  },
  {
    key: 'menuItem4',
    iconName: 'search',
    title: 'Get link',
  },
  {
    key: 'menuItem5',
    iconName: 'plus',
    title: 'Add to...',
    divider: true,
  },
  {
    key: 'menuItem6',
    iconName: 'bookmark',
    title: 'Move to collection',
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
    key: 'menuItem7',
    iconName: 'copy',
    title: 'Copy to collection',
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
    key: 'menuItem8',
    iconName: 'delete',
    title: 'Remove',
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

const callback = () => {
  alert('Callback invoked')
}

const ContextMenuExample = () => <ContextMenu menutree={menuTree} callback={callback} />

export default ContextMenuExample
