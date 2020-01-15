import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown } from '@fluentui/react'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'

interface DropdownVirtualizerProps {
  renderedItems: React.ReactElement[]
}

function DropdownVirtualizer(props: DropdownVirtualizerProps) {
  const cache = new CellMeasurerCache({
    defaultHeight: 20,
    fixedWidth: true,
  })

  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { renderedItems } = props

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {React.cloneElement(_.invoke(renderedItems[index], 'children'), {
          style,
        })}
      </CellMeasurer>
    )
  }

  return (
    <ReactVirtualizedList
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={rowRenderer}
      estimatedRowSize={20}
      height={276}
      rowCount={props.renderedItems.length}
      width={356}
    />
  )
}

const items = []
for (let index = 0; index < 200; index++) {
  items.push(`item number ${index}`)
}

const VirtualizedDropdownPrototype = () => (
  <Dropdown
    items={items}
    renderedItems={renderedItems => <DropdownVirtualizer renderedItems={renderedItems} />}
  />
)

export default VirtualizedDropdownPrototype
