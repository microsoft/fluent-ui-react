import React from 'react'
import { Avatar, ContextMenu, Icon } from '@stardust-ui/react'

const items = [
  {
    key: 'menuItem0',
    header: 'John Doe',
    content: 'Saved on 10/5/2018',
    media: <Avatar image="public/images/avatar/small/elliot.jpg" />,
  },
  {
    key: 'menuItem1',
    media: <Icon name="align justify" />,
    header: 'Show in channel',
    onClick: () => {
      alert('ListItem callback invoked..')
    },
  },
  {
    key: 'menuItem2',
    media: <Icon name="edit" />,
    header: 'Edit',
  },
  {
    key: 'menuItem3',
    media: <Icon name="file word" />,
    header: 'Open in Word',
  },
  {
    key: 'menuItem4',
    media: <Icon name="search" />,
    header: 'Get link',
  },
  {
    key: 'menuItem5',
    media: <Icon name="plus" />,
    header: 'Add to...',
    headerMedia: <Icon name="arrow right" />,
    menu: {
      items: [
        {
          key: 'subItem0',
          header: 'Click for callback',
        },
        {
          key: 'subItem1',
          header: 'Click for callback',
        },
      ],
    },
  },
  {
    key: 'menuItem6',
    media: <Icon name="bookmark" />,
    header: 'Move to collection',
    headerMedia: <Icon name="arrow right" />,
    menu: {
      items: [
        {
          key: 'subItem0',
          header: 'Open Submenu 1.1',
          menu: {
            items: [
              {
                key: 'subItem0',
                header: 'Click for callback',
              },
              {
                key: 'subItem1',
                header: 'Click for callback',
              },
            ],
          },
        },
        {
          key: 'subItem1',
          header: 'Click for callback',
        },
      ],
    },
  },
  {
    key: 'menuItem7',
    media: <Icon name="copy" />,
    header: 'Copy to collection',
    headerMedia: <Icon name="arrow right" />,
    menu: {
      items: [
        {
          key: 'subItem0',
          header: 'Click for callback',
        },
        {
          key: 'subItem1',
          header: 'Click for callback',
        },
      ],
    },
  },
  {
    key: 'menuItem8',
    media: <Icon name="delete" />,
    header: 'Remove',
    headerMedia: <Icon name="arrow right" />,
    menu: {
      items: [
        {
          key: 'subItem0',
          header: 'Click for callback',
        },
        {
          key: 'subItem1',
          header: 'Click for callback',
        },
      ],
    },
  },
]

const callback = () => {
  alert('ContextMenu callback invoked...')
}

const ContextMenuExample = () => <ContextMenu items={items} onItemClick={callback} />

export default ContextMenuExample
