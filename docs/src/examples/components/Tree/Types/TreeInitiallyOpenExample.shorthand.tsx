import * as React from 'react'
import { Tree } from '@stardust-ui/react'

const items = [
  {
    id: '1',
    title: 'House Lannister',
    initialOpen: true,
    items: [
      {
        id: '11',
        title: 'Tywin',
        items: [
          {
            id: '111',
            title: 'Jaime',
          },
          {
            id: '112',
            title: 'Cersei',
          },
          {
            id: '113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: '12',
        title: 'Kevan',
        initialOpen: true,
        items: [
          {
            id: '121',
            title: 'Lancel',
          },
          {
            id: '121',
            title: 'Willem',
          },
          {
            id: '123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'House Targaryen',
    items: [
      {
        id: '21',
        title: 'Aerys',
        initialOpen: true,
        items: [
          {
            id: '211',
            title: 'Rhaegar',
          },
          {
            id: '212',
            title: 'Viserys',
          },
          {
            id: '213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const TreeInitiallyOpenExampleShorthand = () => <Tree items={items} />

export default TreeInitiallyOpenExampleShorthand
