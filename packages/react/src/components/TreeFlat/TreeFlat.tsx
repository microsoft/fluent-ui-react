import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
// import { VariableSizeList as ReactWindowList } from 'react-window'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'
import * as React from 'react'

import TreeItemFlat, { TreeItemFlatProps } from './TreeItemFlat'
import {
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  UIComponent,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs, ShorthandCollection } from '../../types'

export interface TreeFlatSlotClassNames {
  item: string
}

export interface TreeFlatProps extends UIComponentProps, ChildrenComponentProps {
  /** Shorthand array of props for Tree. */
  items?: ShorthandCollection<TreeItemFlatProps>
}

export interface TreeFlatState {
  visibleItems: ShorthandCollection<TreeItemFlatProps>
}

class TreeFlat extends UIComponent<WithAsProp<TreeFlatProps>, TreeFlatState> {
  static create: Function

  static displayName = 'TreeFlat'

  static className = 'ui-treeflat'

  static slotClassNames: TreeFlatSlotClassNames = {
    item: `${TreeFlat.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: customPropTypes.collectionShorthand,
  }

  static defaultProps = {
    as: 'div',
  }

  cache = null

  constructor(props, context) {
    super(props, context)

    this.state = {
      visibleItems: props.items,
    }

    this.cache = new CellMeasurerCache({
      defaultHeight: 20,
      fixedWidth: true,
    })
  }

  handleTreeItemOverrides = (predefinedProps: TreeItemFlatProps) => ({
    onClick: (e: React.SyntheticEvent, treeItemProps: TreeItemFlatProps) => {
      const { index, open, items } = treeItemProps
      const { visibleItems } = this.state
      if (open) {
        const end = visibleItems.indexOf(_.last(items))
        this.setState({
          visibleItems: [...visibleItems.slice(0, index + 1), ...visibleItems.slice(end + 1)],
        })
      } else {
        const subItems = visibleItems[index]['items']
        if (!subItems) {
          return
        }
        this.setState({
          visibleItems: [
            ...visibleItems.slice(0, index + 1),
            ...subItems,
            ...visibleItems.slice(index + 1),
          ],
        })
      }
      _.invoke(predefinedProps, 'onClick', e, treeItemProps)
    },
  })

  // renderItem = ({ index, style }) => {
  //   const { visibleItems } = this.state
  //   const isSubtree = !!visibleItems[index]['items']
  //   const open = isSubtree && visibleItems[index + 1] === visibleItems[index]['items'][0]

  //   return TreeItemFlat.create(visibleItems[index], {
  //     defaultProps: {
  //       className: TreeFlat.slotClassNames.item,
  //       index,
  //       style,
  //       open,
  //     },
  //     overrideProps: this.handleTreeItemOverrides,
  //   })
  // }

  rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { visibleItems } = this.state
    const isSubtree = !!visibleItems[index]['items']
    const open = isSubtree && visibleItems[index + 1] === visibleItems[index]['items'][0]
    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {TreeItemFlat.create(visibleItems[index], {
          defaultProps: {
            className: TreeFlat.slotClassNames.item,
            index,
            style,
            open,
          },
          overrideProps: this.handleTreeItemOverrides,
        })}
      </CellMeasurer>
    )
  }

  renderContent() {
    const { visibleItems } = this.state
    // return (
    //   <ReactWindowList height={100} itemCount={visibleItems.length} itemSize={index => 20}>
    //     {this.renderItem}
    //   </ReactWindowList>
    // )
    return (
      <ReactVirtualizedList
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        height={100}
        rowCount={visibleItems.length}
        width={600}
      />
    )
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeFlat.create = createShorthandFactory({ Component: TreeFlat, mappedArrayProp: 'items' })

/**
 * A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof TreeFlat, TreeFlatProps, 'ul'>(TreeFlat)
