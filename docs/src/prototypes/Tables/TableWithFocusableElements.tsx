import * as React from 'react'
import { Table, Icon, Button } from '@stardust-ui/react'

const header = {
  items: [{ content: 'id' }, { content: 'Name' }, { content: 'Picture' }, { content: 'Action' }],
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
  },
  {
    items: [
      { content: '2' },
      { content: 'Alex' },
      { content: <Icon name="call-video" /> },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3' },
      { content: 'Ali' },
      { content: <Icon name="call-video" /> },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
  },
]

const TableWithFocusableElements = () => <Table header={header} rows={rows} />

export default TableWithFocusableElements
