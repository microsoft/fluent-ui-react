import * as React from 'react'
import avatar from './avatar'

import {
  Table,
  Button,
  tableNestedNavigationBehavior,
  tableRowNestedNavigationBehavior,
  tableHeaderRowNestedNavigationBehavior,
  Popup,
  popupFocusTrapBehavior,
  Header,
  Input,
} from '@stardust-ui/react'

const renderPopup = () => (
  <Popup
    accessibility={popupFocusTrapBehavior}
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
      { content: '1' },
      {
        content: (
          <span>
            Roman <br />
            <button>Button</button>
          </span>
        ),
      },
      { content: avatar },
      { content: renderPopup() },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '2' },
      { content: 'Alex' },
      { content: avatar },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '3' },
      { content: 'Ali' },
      { content: avatar },
      { content: <Button>Click</Button> },
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
