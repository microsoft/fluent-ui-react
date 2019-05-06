import * as React from 'react'
import { Table, Icon } from '@stardust-ui/react'

const header = {
  items: [{ content: 'id' }, { content: 'Name' }, { content: 'Picture' }, { content: 'Action' }],
}

const rows = [
  {
    items: [
      { content: '1' },
      {
        content: 'Roman',
      },
      { content: <Icon name="call-video" /> },
      { content: 'Some text' },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '2' },
      { content: 'Alex' },
      { content: <Icon name="call-video" /> },
      { content: 'Some text' },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3' },
      { content: 'Ali' },
      { content: <Icon name="call-video" /> },
      { content: 'Some text' },
    ],
    headerIndex: 2,
  },
]

const StaticTable = () => <Table header={header} rows={rows} />

export default StaticTable
