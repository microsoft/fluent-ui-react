import * as React from 'react'
import { Table } from '@fluentui/react'
import { AutoSizer, Table as ReactVirtualizedTable } from 'react-virtualized'
import getItems from './itemsGenerator'

interface TableVirtualizerProps {
  renderedItems: React.ReactElement[]
}

function TableVirtualizer(props: TableVirtualizerProps) {
  const rowGetter = ({ index }) => {
    return props.renderedItems[index]
  }

  const rowRenderer = ({ index, style, rowData }) => {
    return React.cloneElement(props.renderedItems[index], {
      style,
    })
  }

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <ReactVirtualizedTable
          disableHeader={true}
          height={600}
          rowCount={props.renderedItems.length}
          width={width}
          rowHeight={80}
          rowGetter={rowGetter}
          rowRenderer={rowRenderer}
          overscanRowCount={5}
        />
      )}
    </AutoSizer>
  )
}

const { header, rows } = getItems()

const VirtualizedTablePrototype = () => (
  <Table
    rows={rows}
    header={header}
    renderedItems={renderedItems => <TableVirtualizer renderedItems={renderedItems} />}
  />
)

export default VirtualizedTablePrototype
