import * as React from 'react'
import { Table, Button } from '@stardust-ui/react'
import avatar from './avatar'

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
      { content: avatar },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '2' },
      { content: 'Alex' },
      { content: avatar },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3' },
      { content: 'Ali' },
      { content: avatar },
      { content: <Button>Click</Button> },
    ],
    headerIndex: 2,
  },
]

const TableWithFocusableElements = () => (
  <Table header={header} rows={rows} aria-label="focusable elements" />
)

export default TableWithFocusableElements
