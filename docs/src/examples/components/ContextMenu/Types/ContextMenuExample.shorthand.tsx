import React from 'react'
import { ContextMenu } from '@stardust-ui/react'

const items = [
  {
    key: 'show',
    content: 'Show in channel',
    icon: 'search',
    divider: true,
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
          menu: { items: [{ key: '1', content: 'item1' }, { key: '2', content: 'item2' }] },
        },
      ],
    },
  },
  { key: 'move', content: 'Move to collection', icon: 'arrow right' },
  { key: 'copy', content: 'Copy to collection', icon: 'copy' },
  { key: 'remove', content: 'Remove', icon: 'delete', divider: true },
  { key: 'edit', content: 'Edit', icon: 'edit' },
  { key: 'getlink', content: 'Get link', icon: 'file' },
]

const callback = () => {
  alert('ContextMenu callback invoked...')
}

const ContextMenuExample = () => <ContextMenu items={items} onItemClick={callback} />

export default ContextMenuExample
