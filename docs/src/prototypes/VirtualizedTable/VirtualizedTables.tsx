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
  return (
    <Table
      rows={rows}
      header={header}
      renderedItems={renderedItems => {
        const rowGetter = ({ index }) => {
          return renderedItems[index]
        }

        const rowRenderer = ({ index, style }) => {
          return React.cloneElement(renderedItems[index], {
            style,
          })
        }
        return (
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
        )
      }}
    />
  )
}

export default VirtualizedTablesPrototype
