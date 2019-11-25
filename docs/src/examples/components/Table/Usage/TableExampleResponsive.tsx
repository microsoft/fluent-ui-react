import * as React from 'react'
import { Table } from '@stardust-ui/react'

const ResponsiveTable = () => (
  <Table
    aria-label="table"
    header={[
      { priority: 4, minWidth: 50, flex: 1, content: 'First' },
      { priority: 3, minWidth: 150, flex: 3, content: 'Second' },
      { priority: 2, minWidth: 50, flex: 2, content: 'Third' },
      { priority: 1, minWidth: 250, flex: 4, content: 'Fourth' },
    ]}
    rows={[['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']]}
  />
)
export default ResponsiveTable
