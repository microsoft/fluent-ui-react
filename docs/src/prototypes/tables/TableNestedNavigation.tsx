import * as React from 'react'
import avatar from './avatar'

import {
  Table,
  Button,
  tableNestedNavigationBehavior,
  tableRowNestedNavigationBehavior,
  tableHeaderRowNestedNavigationBehavior,
  Popup,
  Header,
  Input,
  gridCellBehavior,
} from '@stardust-ui/react'

const renderPopup = () => (
  <Popup
    trapFocus
    trigger={<Button content="Press to open Popup" />}
    content={{
      content: (
        <>
          <Header as="h4">This content traps focus on appearance.</Header>
          <Input icon="search" placeholder="Search..." />
        </>
      ),
    }}
  />
)

const header = {
  items: [{ content: 'id' }, { content: 'Name' }, { content: 'Picture' }, { content: 'Action' }],
  accessibility: tableHeaderRowNestedNavigationBehavior,
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
      { content: avatar, accessibility: gridCellBehavior },
      { content: renderPopup(), accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '2', accessibility: gridCellBehavior },
      { content: 'Alex', accessibility: gridCellBehavior },
      { content: avatar, accessibility: gridCellBehavior },
      { content: <Button>Click</Button>, accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '3', accessibility: gridCellBehavior },
      { content: 'Ali', accessibility: gridCellBehavior },
      { content: avatar, accessibility: gridCellBehavior },
      { content: <Button>Click</Button>, accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
]

const TableNestedNavigation = () => (
  <Table
    aria-label="nested row navigation"
    header={header}
    rows={rows}
    accessibility={tableNestedNavigationBehavior}
    focusedCol={0}
    focusedRow={0}
  />
)

export default TableNestedNavigation
