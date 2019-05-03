import * as React from 'react'
import { Table, Icon, Button } from '@stardust-ui/react'

const headers = [
  {
    content: 'id',
    'data-is-focusable': true,
  },
  {
    content: 'Name',
    'data-is-focusable': true,
  },
  {
    content: 'Picture',
    'data-is-focusable': true,
  },
  {
    content: 'Action',
    'data-is-focusable': true,
  },
]

const rows = [
  {
    items: [
      {
        content: '1',
        'data-is-focusable': true,
      },
      {
        content: 'Roman',
        'data-is-focusable': true,
      },
      {
        content: <Icon name="call-video" />,
        'data-is-focusable': true,
      },
      {
        content: <Button>Click</Button>,
      },
    ],
    headerIndex: 2,
  },
  {
    items: [
      {
        content: '2',
        'data-is-focusable': true,
      },
      {
        content: 'Alex',
        'data-is-focusable': true,
      },
      {
        content: <Icon name="call-video" />,
        'data-is-focusable': true,
      },
      {
        content: <Button>Click</Button>,
      },
    ],
    headerIndex: 2,
  },
  {
    items: [
      {
        content: '3',
        'data-is-focusable': true,
      },
      {
        content: 'Ali',
        'data-is-focusable': true,
      },
      {
        content: <Icon name="call-video" />,
        'data-is-focusable': true,
      },
      {
        content: <Button>Click</Button>,
      },
    ],
    headerIndex: 2,
  },
]

const GridExample = () => <Table headers={headers} rows={rows} />

export default GridExample
