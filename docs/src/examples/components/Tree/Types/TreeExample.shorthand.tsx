import * as React from 'react'
import { Tree } from '@stardust-ui/react'

const treeData = [
  {
    title: 'one',
    subtree: [
      {
        title: 'one one',
        subtree: [
          {
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    title: ' two',
    subtree: [
      {
        title: 'two one',
      },
    ],
  },
]

const TreeExampleShorthand = () => <Tree treedata={treeData} />

export default TreeExampleShorthand
