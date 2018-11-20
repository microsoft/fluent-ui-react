import * as React from 'react'
import { Tree } from '@stardust-ui/react'

const items = [
  {
    title: 'one',
    items: [
      {
        title: 'one one',
        items: [
          {
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    title: ' two',
    items: [
      {
        title: 'two one',
      },
    ],
  },
]

const TreeExampleShorthand = () => <Tree items={items} />

export default TreeExampleShorthand
