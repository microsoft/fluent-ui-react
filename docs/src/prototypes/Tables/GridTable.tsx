import * as React from 'react'
import {
  Table,
  Button,
  gridTableBehavior,
  gridCellBehavior,
  Popup,
  popupFocusTrapBehavior,
  Header,
  Input,
} from '@stardust-ui/react'
import { renderDropdown } from './multipleDropdown'
import avatar from './avatar'

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
      { content: avatar, accessibility: gridCellBehavior },
      { content: renderPopup(), accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '2', accessibility: gridCellBehavior },
      { content: 'Alex', accessibility: gridCellBehavior },
      { content: avatar, accessibility: gridCellBehavior },
      { content: renderDropdown(), accessibility: gridCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3', accessibility: gridCellBehavior },
      { content: 'Ali', accessibility: gridCellBehavior },
      { content: avatar, accessibility: gridCellBehavior },
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
