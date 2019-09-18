import * as React from 'react'
import { Tree } from '@stardust-ui/react'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'
import getItems from './itemsGenerator'

interface TreeVirtualizerProps {
  renderedItems: React.ReactElement[]
}

function TreeVirtualizer(props: TreeVirtualizerProps) {
  const cache = new CellMeasurerCache({
    defaultHeight: 20,
    fixedWidth: true,
  })

  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { renderedItems } = props

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {React.cloneElement(renderedItems[index], { style })}
      </CellMeasurer>
    )
  }

  return (
    <ReactVirtualizedList
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={rowRenderer}
      estimatedRowSize={20}
      height={300}
      rowCount={props.renderedItems.length}
      width={600}
    />
  )
}

const items = getItems()

const VirtualizedTreePrototype = () => (
  <Tree
    items={items}
    renderedItems={renderedItems => <TreeVirtualizer renderedItems={renderedItems} />}
  />
)

export default VirtualizedTreePrototype
