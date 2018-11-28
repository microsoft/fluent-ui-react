import * as React from 'react'
import { Tree } from '@stardust-ui/react'

const items = [
  {
    key: '1',
    title: 'one',
    items: [
      {
        key: '1',
        title: 'one one',
        items: [
          {
            key: '1',
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: ' two',
    items: [
      {
        key: '1',
        title: 'two one',
      },
    ],
  },
]

const TreeExampleShorthand = () => <Tree items={items} />

export default TreeExampleShorthand
