import * as React from 'react'
import { Accordion, Table } from '@fluentui/react'
import { AutoSizer, WindowScroller, Table as ReactVirtualizedTable } from 'react-virtualized'
import getItems from './itemsGenerator'

const scrollbarOffset = 10
function VirtualizedTablesPrototype() {
  const [ref, setRef] = React.useState(null)

  const tables = [
    {
      key: 'table1',
      title: <div>Table one</div>,
      content: <VirtualizedTable scrollElementRef={ref} />,
    },
    {
      key: 'table2',
      title: <div>Custom table title</div>,
      content: <VirtualizedTable scrollElementRef={ref} />,
    },
  ]

  return (
    <div id="scrollParent" style={{ height: '700px', overflowY: 'auto' }} ref={setRef}>
      {ref != null ? <Accordion panels={tables} /> : null}
    </div>
  )
}

interface VirtualizedTableProps {
  scrollElementRef: React.RefObject<HTMLDivElement>
}

function VirtualizedTable(props: VirtualizedTableProps) {
  const { header, rows } = getItems(200, 500)
  const renderedItems = [header, ...rows]
  const rowGetter = ({ index }) => {
    return renderedItems[index]
  }

  const rowRenderer = ({ index, style }) => {
    const row = renderedItems[index]
    const topOffset = `${style.top}px`
    const leftOffset = `${style.left}px`
    const height = `${style.height}px`
    const width = `${style.width - scrollbarOffset}px`
    return (
      <Table.Row
        design={{ top: topOffset, left: leftOffset, width, height, position: style.position }}
        key={row.key}
        header={row.key === 'header'}
        styles={{ overflow: style.overflow }}
      >
        <Table.Cell {...row.items[0]} />
        <Table.Cell {...row.items[1]} />
        <Table.Cell {...row.items[2]} />
        <Table.Cell {...row.items[3]} />
      </Table.Row>
    )
  }

  return (
    <Table rows={rows} header={header}>
      <WindowScroller scrollElement={props.scrollElementRef} key={props.scrollElementRef}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              return height ? (
                <div ref={el => registerChild(el)}>
                  <ReactVirtualizedTable
                    autoHeight
                    disableHeader={true}
                    height={height}
                    rowCount={renderedItems.length}
                    width={width - scrollbarOffset}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowHeight={80}
                    isScrolling={isScrolling}
                    rowGetter={rowGetter}
                    rowRenderer={rowRenderer}
                    overscanRowCount={20}
                  />
                </div>
              ) : null
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </Table>
  )
}

export default VirtualizedTablesPrototype
