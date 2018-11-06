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
    submenu: [
      {
        title: 'two one',
      },
    ],
  },
]

const TreeExampleShorthand = () => <Tree treedata={treeData} />

export default TreeExampleShorthand
