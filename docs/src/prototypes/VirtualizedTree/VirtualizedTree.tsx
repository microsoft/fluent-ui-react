import * as React from 'react'
import { Tree } from '@stardust-ui/react'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'

interface TreeVirtualizerProps {
  renderedItems: React.Component[]
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
        {renderedItems[index]}
      </CellMeasurer>
    )
  }

  render() {
    return (
      <ReactVirtualizedList
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        height={100}
        rowCount={this.props.renderedItems.length}
        width={600}
      />
    )
  }
}

const items = [
  {
    id: '1',
    title: 'House Lannister',
    items: [
      {
        id: '11',
        title: 'Tywin',
        items: [
          {
            id: '111',
            title: 'Jaime',
          },
          {
            id: '112',
            title: 'Cersei',
          },
          {
            id: '113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: '12',
        title: 'Kevan',
        items: [
          {
            id: '121',
            title: 'Lancel',
          },
          {
            id: '122',
            title: 'Willem',
          },
          {
            id: '123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'House Targaryen',
    items: [
      {
        id: '21',
        title: 'Aerys',
        items: [
          {
            id: '211',
            title: 'Rhaegar',
          },
          {
            id: '212',
            title: 'Viserys',
          },
          {
            id: '213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const VirtualizedTreePrototype = () => (
  <Tree
    items={items}
    virtualized={renderedItems => <TreeVirtualizer renderedItems={renderedItems} />}
  />
)

export default VirtualizedTreePrototype
