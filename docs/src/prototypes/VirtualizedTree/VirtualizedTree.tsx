import * as React from 'react'
import { Tree, TreeItemProps } from '@stardust-ui/react'
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
  const [scrollToIndex, setScrollToIndex] = React.useState()

  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { renderedItems } = props

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {React.cloneElement(renderedItems[index], {
          style,
          onFocusParent: (e, treeItemProps: TreeItemProps) => {
            const { parent } = treeItemProps

            renderedItems[index].props.onFocusParent(e, treeItemProps)

            if (!parent) {
              return
            }

            const indexOfParent = renderedItems.findIndex(
              (renderedItem: React.ReactElement) => renderedItem.props['id'] === parent['id'],
            )

            if (renderedItems[indexOfParent].props['contentRef'].current) {
              return
            }

            setScrollToIndex(indexOfParent)
          },
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
      height={300}
      rowCount={props.renderedItems.length}
      width={600}
      scrollToIndex={scrollToIndex}
      onRowsRendered={() => {
        if (scrollToIndex !== undefined) {
          props.renderedItems[scrollToIndex].props.contentRef.current.focus()
          setScrollToIndex(undefined)
        }
      }}
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
