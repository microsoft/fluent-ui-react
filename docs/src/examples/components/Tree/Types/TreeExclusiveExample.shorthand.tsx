import * as React from 'react'
import { Icon, Tree } from '@stardust-ui/react'

const items = [
  {
    key: '1',
    title: 'one',
    items: [
      {
        key: '2',
        title: 'one one',
        items: [
          {
            key: '3',
            title: 'one one one',
          },
        ],
      },
      {
        key: '6',
        title: 'one two',
        items: [
          {
            key: '7',
            title: 'one two one',
          },
        ],
      },
    ],
  },
  {
    key: '4',
    title: 'two',
    items: [
      {
        key: '5',
        title: 'two one',
      },
    ],
  },
]

const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
  <Component open={open} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && <Icon name={open ? 'arrow down' : 'arrow right'} />}
    <span>{content}</span>
  </Component>
)

const TreeExclusiveExample = () => (
  <Tree items={items} renderItemTitle={titleRenderer} exclusive={true} />
)

export default TreeExclusiveExample
