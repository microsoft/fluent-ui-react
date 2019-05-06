import * as React from 'react'
import { Table, Icon, Button, gridTableBehavior, gridCellBehavior } from '@stardust-ui/react'

const header = {
  items: [
    { content: 'id', accessibility: gridCellBehavior },
    { content: 'Name', accessibility: gridCellBehavior },
    { content: 'Picture', accessibility: gridCellBehavior },
    { content: 'Action', accessibility: gridCellBehavior },
  ],
}

const rows = [
  {
    items: [
      { content: '1', accessibility: gridCellBehavior },
      {
        content: (
          <span>
            Roman <br />
            <button>Button</button>
          </span>
        ),
        accessibility: gridCellBehavior,
      },
      { content: <Icon name="call-video" />, accessibility: gridCellBehavior },
      { content: <Button>Click</Button>, accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '2', accessibility: gridCellBehavior },
      { content: 'Alex', accessibility: gridCellBehavior },
      { content: <Icon name="call-video" />, accessibility: gridCellBehavior },
      { content: <Button>Click</Button>, accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3', accessibility: gridCellBehavior },
      { content: 'Ali', accessibility: gridCellBehavior },
      { content: <Icon name="call-video" />, accessibility: gridCellBehavior },
      { content: <Button>Click</Button>, accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
  },
]

const TableNestedNavigation = () => (
  <Table
    header={header}
    rows={rows}
    accessibility={gridTableBehavior}
    focusedCol={0}
    focusedRow={0}
  />
)

export default TableNestedNavigation
