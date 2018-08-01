import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { customPropTypes, UIComponent } from '../../lib'
import ListItem from './ListItem'
import listRules from './listRules'
import listVariables from './listVariables'
import {
  List as VirtualizedList,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized'

class ListWithReactVirtualized extends UIComponent<any, any> {
  private cache: CellMeasurerCache

  constructor(props, context) {
    super(props, context)
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  }

  static displayName = 'List'

  static className = 'ui-list'

  static rules = listRules

  static variables = listVariables

  static propTypes = {
    as: customPropTypes.as,

    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: PropTypes.arrayOf(PropTypes.any),

    /** A selection list formats list items as possible choices. */
    selection: PropTypes.bool,

    /** Truncates content */
    truncateContent: PropTypes.bool,

    /** Truncates header */
    truncateHeader: PropTypes.bool,

    /** Variables */
    variables: PropTypes.object,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'debug',
    'items',
    'selection',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  renderRow = ({ index, key, style, parent }) => {
    console.log('Invoked')
    const { items } = this.props
    const itemProps = _.pick(this.props, ListWithReactVirtualized.itemProps)
    return (
      <CellMeasurer key={key} cache={this.cache} parent={parent} columnIndex={0} rowIndex={index}>
        {/*{items[index]}*/}
        {ListItem.create(items[index], { defaultProps: itemProps })}
      </CellMeasurer>
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { items } = this.props
    const itemProps = _.pick(this.props, ListWithReactVirtualized.itemProps)

    return (
      <AutoSizer disableHeight>
        {({ width, height }) => {
          return (
            <VirtualizedList
              height={height || 100}
              width={width}
              rowHeight={this.cache.rowHeight}
              rowRenderer={this.renderRow}
              rowCount={items.length}
              overscanRowCount={3}
            />
          )
        }}
      </AutoSizer>
    )
  }
}

export default ListWithReactVirtualized
