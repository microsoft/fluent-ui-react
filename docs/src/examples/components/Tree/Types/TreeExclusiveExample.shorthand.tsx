import * as React from 'react'
import { Icon, Tree } from '@stardust-ui/react'

const items = [
  {
    title: 'one',
    key: '1',
    items: [
      {
        title: 'one one',
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
    key: '4',
    items: [
      {
        title: 'two one',
        key: '5',
      },
    ],
  },
]

const titleRenderer = (Component, { active, content, ...rest }) => (
  <Component {...rest}>
    <Icon name={active ? 'arrow down' : 'arrow right'} />
    <span>{content}</span>
  </Component>
)

const TreeExclusiveExample = () => <Tree items={items} renderTitle={titleRenderer} />

export default TreeExclusiveExample
