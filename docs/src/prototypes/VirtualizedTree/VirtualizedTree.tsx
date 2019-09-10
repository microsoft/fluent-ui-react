import * as _ from 'lodash'
import * as React from 'react'
import { Tree } from '@stardust-ui/react'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'

interface TreeVirtualizerProps {
  renderedItems: React.ReactElement[]
}

class TreeVirtualizer extends React.Component<TreeVirtualizerProps> {
  cache = null

  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      defaultHeight: 20,
      fixedWidth: true,
    })
  }

  rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { renderedItems } = this.props

    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {React.cloneElement(renderedItems[index], { style })}
      </CellMeasurer>
    )
  }

  render() {
    return (
      <ReactVirtualizedList
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        estimatedRowSize={20}
        height={300}
        rowCount={this.props.renderedItems.length}
        width={600}
      />
    )
  }
}

const maxLevel = 1
const minItems = 20
const maxItems = 40
const getItemsNumber = () => _.random(minItems, maxItems)

function generateLevel(level = 0, parent = '') {
  if (level === 0) {
  }
  const result = []
  for (let index = 0; index < getItemsNumber(); index++) {
    const item = {
      id: `${parent}${parent ? '-' : ''}${index}`,
      title: `${parent}${parent ? '-' : ''}${index}`,
      ...(level < maxLevel && { items: generateLevel(level + 1, `${parent}${index}`) }),
    }
    result.push(item)
  }
  return result
}

const items = generateLevel()

const VirtualizedTreePrototype = () => (
  <Tree
    items={items}
    renderedItems={renderedItems => <TreeVirtualizer renderedItems={renderedItems} />}
  />
)

export default VirtualizedTreePrototype
