import * as React from 'react'
import { Table, tableHeaderCellBehavior } from '@fluentui/react'
import { AutoSizer, Table as ReactVirtualizedTable } from 'react-virtualized'
import getItems from './itemsGenerator'

const { rows } = getItems()

const VirtualizedTablePrototype = () => {
  const rowGetter = ({ index }) => {
    return rows[index]
  }

  const rowRenderer = ({ index, style }) => {
    const row = rows[index]
    const topOffset = `${style.top}px`
    const leftOffset = `${style.left}px`
    const height = `${style.height}px`
    const width = `${style.width}px`
    return (
      <Table.Row
        design={{ top: topOffset, left: leftOffset, width, height, position: style.position }}
        key={row.key}
      >
        <Table.Cell {...row.items[0]} />
        <Table.Cell {...row.items[1]} />
        <Table.Cell {...row.items[2]} />
        <Table.Cell {...row.items[3]} />
      </Table.Row>
    )
  }

  return (
    <Table>
      <Table.Row header>
        <Table.Cell content="id" key="id" accessibility={tableHeaderCellBehavior} />
        <Table.Cell content="Name" key="name" accessibility={tableHeaderCellBehavior} />
        <Table.Cell content="Picture" key="pic" accessibility={tableHeaderCellBehavior} />
        <Table.Cell content="Age" key="age" accessibility={tableHeaderCellBehavior} />
      </Table.Row>
      <AutoSizer disableHeight>
        {({ width }) => (
          <ReactVirtualizedTable
            disableHeader={true}
            height={400}
            rowCount={rows.length}
            width={width}
            rowHeight={80}
            rowGetter={rowGetter}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </Table>
  )
}

export default VirtualizedTablePrototype
