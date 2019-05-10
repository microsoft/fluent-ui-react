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
        content: <Icon aria-label="word" name="word-color" />,
      },
      { content: <span>Accessibility stardust patterns</span> },
      { content: <span>7/17/18</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      {
        content: <Icon aria-label="excel" name="excel-color" />,
      },
      { content: <span>Budget</span> },
      { content: <span>9/25/18</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
  {
    items: [
      {
        content: <Icon aria-label="powerpoint" name="powerpoint-color" />,
      },
      { content: <span>Accessibility for everyone</span> },
      { content: <span>1/17/19</span> },
    ],
    accessibility: tableRowNestedNavigationBehavior,
  },
]

const AttachmentsTable = () => (
  <Table
    aria-label="Attachments"
    header={header}
    rows={rows}
    accessibility={tableVerticalNavigationBehavior}
    focusedCol={0}
    focusedRow={0}
  />
)

export default AttachmentsTable
