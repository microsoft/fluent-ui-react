import * as React from 'react'
import {
  Table,
  Icon,
  Button,
  tableNestedNavigationBehavior,
  tableRowNestedNavigationBehavior,
} from '@stardust-ui/react'

const header = {
  items: [{ content: 'id' }, { content: 'Name' }, { content: 'Picture' }, { content: 'Action' }],
  accessibility: tableRowNestedNavigationBehavior,
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
      { content: <Icon name="call-video" /> },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '2' },
      { content: 'Alex' },
      { content: <Icon name="call-video" /> },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      { content: '3' },
      { content: 'Ali' },
      { content: <Icon name="call-video" /> },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
    accessibility: tableRowNestedNavigationBehavior,
  },
]

const TableNestedNavigation = () => (
  <Table
    header={header}
    rows={rows}
    accessibility={tableNestedNavigationBehavior}
    focusedCol={0}
    focusedRow={0}
  />
)

export default TableNestedNavigation
