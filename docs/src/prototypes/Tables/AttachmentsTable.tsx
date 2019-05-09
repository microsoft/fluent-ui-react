import * as React from 'react'

import {
  Table,
  Icon,
  tableRowNestedNavigationBehavior,
  tableHeaderRowNestedNavigationBehavior,
  tableVerticalNavigationBehavior,
} from '@stardust-ui/react'

const header = {
  items: [{ content: 'Type' }, { content: 'Name' }, { content: 'Modified' }],
  accessibility: tableHeaderRowNestedNavigationBehavior,
}

const rows = [
  {
    items: [
      {
        content: <Icon name="word-color" />,
      },
      { content: <span>Accessibility stardust patterns</span> },
      { content: <span>7/17/18</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      {
        content: <Icon name="excel-color" />,
      },
      { content: <span>Budget</span> },
      { content: <span>9/25/18</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      {
        content: <Icon name="powerpoint-color" />,
      },
      { content: <span>Accessibility for everyone</span> },
      { content: <span>1/17/19</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
]

const AttachmentsTable = () => (
  <Table
    header={header}
    rows={rows}
    accessibility={tableVerticalNavigationBehavior}
    focusedCol={0}
    focusedRow={0}
  />
)

export default AttachmentsTable
