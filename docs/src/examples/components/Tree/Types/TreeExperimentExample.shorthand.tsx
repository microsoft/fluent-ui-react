import * as React from 'react'
import { TreeFlat } from '@stardust-ui/react'

const items = [
  {
    key: '1',
    content: 'House Lannister',
    items: [
      {
        key: '11',
        content: 'Tywin',
        items: [
          {
            key: '111',
            content: 'Jaime',
          },
          {
            key: '112',
            content: 'Cersei',
          },
          {
            key: '113',
            content: 'Tyrion',
          },
        ],
      },
      {
        key: '21',
        content: 'Kevan',
        items: [
          {
            key: '211',
            content: 'Lancel',
          },
          {
            key: '212',
            content: 'Willem',
          },
          {
            key: '213',
            content: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    content: 'House Targaryen',
    items: [
      {
        key: '21',
        content: 'Aerys',
        items: [
          {
            key: '211',
            content: 'Rhaegar',
          },
          {
            key: '212',
            content: 'Viserys',
          },
          {
            key: '213',
            content: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const TreeExampleShorthand = () => <TreeFlat items={items} />

export default TreeExampleShorthand
