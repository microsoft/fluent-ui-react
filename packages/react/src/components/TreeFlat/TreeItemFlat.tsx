import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
} from '../../lib'
import {
  ComponentEventHandler,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
} from '../../types'
import TreeTitleFlat, { TreeTitleFlatProps } from './TreeTitleFlat'

export interface TreeItemFlatSlotClassNames {
  title: string
  subtree: string
}

export interface TreeItemFlatProps extends UIComponentProps, ChildrenComponentProps {
  /** The index of the item among its sibbling */
  index?: number

  /** Array of props for sub tree. */
  items?: ShorthandCollection<TreeItemFlatProps>

  /** Called when a tree title is clicked. */
  onClick?: ComponentEventHandler<TreeItemFlatProps>

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean

  /** Properties for TreeTitle. */
  title?: ShorthandValue<TreeTitleFlatProps>
}

class TreeItemFlat extends UIComponent<WithAsProp<TreeItemFlatProps>> {
  static create: Function

  static displayName = 'TreeItemFlat'

  static className = 'ui-tree__itemflat'

  static slotClassNames: TreeItemFlatSlotClassNames = {
    title: `${TreeItemFlat.className}__title`,
    subtree: `${TreeItemFlat.className}__subtree`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: customPropTypes.collectionShorthand,
    index: PropTypes.number,
    onClick: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    as: 'div',
  }

  handleTitleOverrides = (predefinedProps: TreeTitleFlatProps) => ({
    onClick: (e, titleProps) => {
      this.handleClick(e)
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderContent() {
    const { title } = this.props

    return TreeTitleFlat.create(title, {
      defaultProps: {
        className: TreeItemFlat.slotClassNames.title,
      },
      overrideProps: this.handleTitleOverrides,
    })
  }

  renderComponent({ ElementType, accessibility, classes, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType className={classes.root} onClick={this.handleClick} {...unhandledProps}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeItemFlat.create = createShorthandFactory({ Component: TreeItemFlat, mappedProp: 'title' })

/**
 * A TreeItem renders an item of a Tree.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof TreeItemFlat, TreeItemFlatProps, 'li'>(TreeItemFlat)
