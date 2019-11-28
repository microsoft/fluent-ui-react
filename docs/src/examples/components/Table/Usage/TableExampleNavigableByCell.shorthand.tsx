import * as React from 'react'
import { Table, Button } from '@fluentui/react'
import { gridCellByCellBehavior, gridCellBehavior } from '@fluentui/accessibility'

const header = {
  key: 'header',
  items: [
    { content: 'id', key: 'id' },
    { content: 'Name', key: 'name' },
    { content: 'Picture', key: 'pic' },
    { content: 'Age', key: 'action' },
    { content: ' ', key: 'more option' },
  ],
}

const moreOptionButton = {
  content: (
    <span>
      <Button tabIndex={-1} icon="more" iconOnly title="More options" />
    </span>
  ),
  truncateContent: true,
  key: '1-5',
}

const rowsPlain = [
  {
    key: 1,
    items: [
      { content: '1', key: '1-1', accessibility: gridCellBehavior },
      {
        content: 'Roman van von der Longername',
        key: '1-2',
        accessibility: gridCellBehavior,
      },
      { content: 'None', key: '1-3', accessibility: gridCellBehavior },
      { content: '30 years', key: '1-4', accessibility: gridCellBehavior },
      moreOptionButton,
    ],
  },
  {
    key: 2,
    items: [
      { content: '2', key: '2-1', accessibility: gridCellBehavior },
      { content: 'Alex', key: '2-2', accessibility: gridCellBehavior },
      { content: 'None', key: '2-3', accessibility: gridCellBehavior },
      { content: '1 year', key: '2-4', accessibility: gridCellBehavior },
      moreOptionButton,
    ],
  },
  {
    key: 3,
    items: [
      { content: '3', key: '3-1', accessibility: gridCellBehavior },
      { content: 'Ali', key: '3-2', accessibility: gridCellBehavior },
      { content: 'None', key: '3-3', accessibility: gridCellBehavior },
      {
        content: '30000000000000 years',
        truncateContent: true,
        key: '3-4',
        accessibility: gridCellBehavior,
      },
      moreOptionButton,
    ],
  },
]

const StaticTable = () => (
  <Table
    variables={{ cellContentOverflow: 'none' }}
    header={header}
    rows={rowsPlain}
    aria-label="Static table"
    accessibility={gridCellByCellBehavior}
  />
)

export default StaticTable
