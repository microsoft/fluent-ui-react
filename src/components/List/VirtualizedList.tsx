import React, { Component } from 'react'

import loremIpsum from 'lorem-ipsum'

import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

const rowCount = 1000

class VirtualizedList extends Component<any, any> {
  private list
  private cache

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.list = Array(rowCount)
      .fill('')
      .map((val, idx) => {
        return {
          id: idx,
          name: 'John Doe',
          image: 'http://via.placeholder.com/40',
          text: loremIpsum({
            count: 2,
            units: 'sentences',
            sentenceLowerBound: 10,
            sentenceUpperBound: 100,
          }),
        }
      })
      .reverse()
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
    this.state = {
      offset: 0,
    }
  }

  renderRow({ index, key, style, parent }) {
    return (
      <CellMeasurer key={key} cache={this.cache} parent={parent} columnIndex={0} rowIndex={index}>
        <div
          style={{
            ...style,
            borderBottom: '1px solid #ebeced',
            textAlign: 'left',
            margin: '5px 0',
            display: 'flex',
            alignItems: 'center',
            '-webkit-transform': 'rotate(180deg)',
            '-moz-transform': 'rotate(180deg)',
            '-o-transform': 'rotate(180deg)',
            '-ms-transform': 'rotate(180deg)',
            transform: 'rotate(180deg)',
            direction: 'ltr',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <img src={this.list[index].image} alt="" />
          </div>
          <div style={{ padding: '10px' }}>
            <div>{this.list[index].id}</div>
            <div>{this.list[index].name}</div>
            <div>{this.list[index].text}</div>
          </div>
        </div>
      </CellMeasurer>
    )
  }

  private wheel(e) {
    console.log(e)
    if ((event as any).nativeEvent) {
      const currentOffset = (event as any).nativeEvent.contentOffset.y
      const direction = currentOffset > this.state.offset ? 'down' : 'up'
      this.setState({
        offset: currentOffset,
      })
      console.log(direction)
      console.log(currentOffset)
    }
  }

  render() {
    return (
      <div className="App">
        <div style={{ marginRight: '10px', height: '500px', width: '100%' }}>
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  onScroll={e => this.wheel(e)}
                  width={width}
                  height={height}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={this.list.length}
                  overscanRowCount={3}
                  style={{
                    '-webkit-transform': 'rotate(180deg)',
                    '-moz-transform': 'rotate(180deg)',
                    '-o-transform': 'rotate(180deg)',
                    msTransform: 'rotate(180deg)',
                    transform: 'rotate(180deg)',
                    unicodeBidi: 'bidi-override',
                    direction: 'rtl',
                  }}
                />
              )
            }}
          </AutoSizer>
        </div>
      </div>
    )
  }
}

export default VirtualizedList
