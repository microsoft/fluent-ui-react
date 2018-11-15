import * as React from 'react'
import { Tree, Icon } from '@stardust-ui/react'
const treeData = [
  {
    title: {
      content: (
        <div>
          <Icon name="arrow right" />
          <span>one</span>
        </div>
      ),
      activeContent: (
        <div>
          <Icon name="arrow down" />
          <span>one</span>
        </div>
      ),
    },
    key: 1,
    subtree: [
      {
        title: {
          content: (
            <div>
              <Icon name="arrow right" />
              <span>one one</span>
            </div>
          ),
          activeContent: (
            <div>
              <Icon name="arrow down" />
              <span>one one</span>
            </div>
          ),
        },
        key: 2,
        subtree: [
          {
            title: 'one one one',
            key: 3,
          },
        ],
      },
    ],
  },
  {
    title: {
      content: (
        <div>
          <Icon name="arrow right" />
          <span>two</span>
        </div>
      ),
      activeContent: (
        <div>
          <Icon name="arrow down" />
          <span>two</span>
        </div>
      ),
    },
    key: 4,
    subtree: [
      {
        title: 'two one',
        key: 5,
      },
    ],
  },
]

const TreeExclusiveExample = () => <Tree treedata={treeData} />

export default TreeExclusiveExample
