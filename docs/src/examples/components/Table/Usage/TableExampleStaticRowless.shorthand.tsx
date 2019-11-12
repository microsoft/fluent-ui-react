import * as React from 'react'
import { Table } from '@stardust-ui/react'

const header = {
  items: ['id', 'Name', 'Picture', 'Age'],
}

const StaticTable = () => <Table header={header} aria-label="Static table with no rows" />

export default StaticTable
