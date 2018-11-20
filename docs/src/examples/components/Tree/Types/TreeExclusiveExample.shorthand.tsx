import * as React from 'react'
import { Tree, Icon } from '@stardust-ui/react'
const titleRenderer = (Component, props, children) => {
  return (
    <Component {...props}>
      <div>
        <Icon name={props.active ? 'arrow down' : 'arrow right'} />
        <span>{props.content}</span>
      </div>
    </Component>
  )
}

const treeData = [
  {
    title: 'one',
    renderTitle: titleRenderer,
    key: '1',
    subtree: [
      {
        title: 'one one',
        renderTitle: titleRenderer,
        key: '2',
        subtree: [
          {
            title: 'one one one',
            key: '3',
          },
        ],
      },
    ],
  },
  {
    title: 'two',
    renderTitle: titleRenderer,
    key: '4',
    subtree: [
      {
        title: 'two one',
        key: '5',
      },
    ],
  },
]

const TreeExclusiveExample = () => <Tree items={treeData} />

export default TreeExclusiveExample
