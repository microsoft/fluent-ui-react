import * as React from 'react'
import { Table } from '@stardust-ui/react'

const header = {
  key: 'header',
  items: [
    { content: 'id', key: 'id' },
    { content: 'Name', key: 'name' },
    { content: 'Picture', key: 'pic' },
    { content: 'Age', key: 'action' },
  ],
}

const StaticTable = () => <Table header={header} aria-label="Static table with no rows" />

export default StaticTable
