import * as React from 'react'
import { Tree } from '@stardust-ui/react'
const treeData = [
  {
    title: 'one',
    submenu: [
      {
        title: 'one one',
        submenu: [
          {
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    title: ' two',
  },
]

const TreeExampleShorthand = () => <Tree content="Hello from Tree!" treedata={treeData} />

export default TreeExampleShorthand
