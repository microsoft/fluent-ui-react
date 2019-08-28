import * as React from 'react'
import { Icon, Tree } from '@stardust-ui/react'

const items = [
  {
    id: '1',
    title: 'one',
    items: [
      {
        id: '2',
        title: 'one one',
        items: [
          {
            id: '3',
            title: 'one one one',
          },
        ],
      },
      {
        id: '6',
        title: 'one two',
        items: [
          {
            id: '7',
            title: 'one two one',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'two',
    items: [
      {
        id: '5',
        title: 'two one',
      },
    ],
  },
]

const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
  <Component open={open} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && <Icon name={open ? 'triangle-down' : 'triangle-right'} />}
    <span>{content}</span>
  </Component>
)

const TreeExclusiveExample = () => <Tree items={items} renderItemTitle={titleRenderer} exclusive />

export default TreeExclusiveExample
