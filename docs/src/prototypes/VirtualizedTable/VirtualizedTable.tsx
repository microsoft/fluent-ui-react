import {
  gridCellBehavior,
  gridHeaderCellBehavior,
  gridNestedBehavior,
  gridRowBehavior,
  Table,
} from '@fluentui/react'
import * as React from 'react'
import { AutoSizer, List as ReactVirtualizedList } from 'react-virtualized'
import getItems from './itemsGenerator'

const { rows } = getItems()

const VirtualizedTablePrototype = () => {
  const rowGetter = ({ index }) => {
    return rows[index]
  }

  const accessibilityListProperties = {
    'aria-label': '',
    'aria-readonly': undefined,
    containerRole: 'presentation',
    role: 'presentation',
    tabIndex: null,
  }

  const rowRenderer = ({ index, style }) => {
    const row = rows[index]
    const topOffset = `${style.top}px`
    const leftOffset = `${style.left}px`
    const height = `${style.height}px`
    return (
      <Table.Row
        design={{
          top: topOffset,
          left: leftOffset,
          width: style.width,
          height,
          position: style.position,
        }}
        key={row.key}
        accessibility={gridRowBehavior}
      >
        <Table.Cell {...row.items[0]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[1]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[2]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[3]} accessibility={gridCellBehavior} />
      </Table.Row>
    )
  }

  return (
    <Table accessibility={gridNestedBehavior}>
      <Table.Row header>
        <Table.Cell content="id" key="id" accessibility={gridHeaderCellBehavior} />
        <Table.Cell content="Name" key="name" accessibility={gridHeaderCellBehavior} />
        <Table.Cell content="Picture" key="pic" accessibility={gridHeaderCellBehavior} />
        <Table.Cell content="Age" key="age" accessibility={gridHeaderCellBehavior} />
      </Table.Row>
      <AutoSizer disableHeight>
        {({ width }) => (
          <ReactVirtualizedList
            disableHeader={true}
            height={400}
            rowCount={rows.length}
            width={width}
            rowHeight={80}
            rowGetter={rowGetter}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
            {...accessibilityListProperties}
          />
        )}
      </AutoSizer>
    </Table>
  )
}

export default VirtualizedTablePrototype
