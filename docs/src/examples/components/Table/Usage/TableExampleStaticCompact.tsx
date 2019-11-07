import * as React from 'react'
import { Table } from '@stardust-ui/react'

const header = {
  key: 'header',
  items: [
    { content: 'id', key: 'id' },
    { content: 'Name', key: 'name' },
    { content: 'Picture', key: 'pic' },
    { content: 'Age', key: 'action' },
  ],
}
const rowsPlain = [
  {
    key: 1,
    items: [
      { content: '1', key: '1-1' },
      {
        content: 'Roman van von der Longername',

        key: '1-2',
      },
      { content: 'None', key: '1-3' },
      { content: '30 years', key: '1-4' },
    ],
  },
  {
    key: 2,
    items: [
      { content: '2', key: '2-1' },
      { content: 'Alex', key: '2-2' },
      { content: 'None', key: '2-3' },
      { content: '1 year', key: '2-4' },
    ],
  },
  {
    key: 3,
    items: [
      { content: '3', key: '3-1' },
      { content: 'Ali', key: '3-2' },
      { content: 'None', key: '3-3' },
      { content: '30000000000000 years', key: '3-4' },
    ],
  },
]

const StaticTableCompact = () => (
  <Table
    variables={{ viewMode: 'compact' }}
    header={header}
    rows={rowsPlain}
    aria-label="Compact view static table"
  />
)

export default StaticTableCompact
