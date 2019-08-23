import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeTitle, { TreeTitleProps } from './TreeTitle'
import { treeItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandRenderFunction,
  ShorthandValue,
  withSafeTypeForAs,
  ShorthandCollection,
} from '../../types'

export interface TreeItemSlotClassNames {
  title: string
  subtree: string
}

export interface TreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Id needed to identify this item inside the Tree. */
  id?: string

  /** The index of the item among its siblings. */
  index?: number

  /** Array of props for sub tree. */
  items?: ShorthandCollection<TreeItemProps>

  /** Level of the tree/subtree that contains this item. */
  level?: number

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<TreeItemProps>

  /** Called when the item's first child is about to be focused. */
  onFocusFirstChild?: ComponentEventHandler<TreeItemProps>

  /** Called when the item's siblings are about to be expanded. */
  onSiblingsExpand?: ComponentEventHandler<TreeItemProps>

  /** Called when the item's parent is about to be focused. */
  onFocusParent?: ComponentEventHandler<TreeItemProps>

  /** Whether or not the item is in the open state. Only makes sense if item has children items. */
  open?: boolean

  /** The id of the parent tree item, if any. */
  parentId?: string

  /** Array with the ids of the tree item's siblings, if any. */
  siblingsLength?: number

  /**
   * A custom render iterator for rendering each tree title.
   * The default component, props, and children are available for each tree title.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction

  /** Properties for TreeTitle. */
  title?: ShorthandValue<TreeTitleProps>
}

class TreeItem extends UIComponent<WithAsProp<TreeItemProps>> {
  static create: Function

  static displayName = 'TreeItem'

  static className = 'ui-tree__item'

  static slotClassNames: TreeItemSlotClassNames = {
    title: `${TreeItem.className}__title`,
    subtree: `${TreeItem.className}__subtree`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    level: PropTypes.number,
    id: PropTypes.string,
    index: PropTypes.number,
    items: customPropTypes.collectionShorthand,
    onTitleClick: PropTypes.func,
    onFocusFirstChild: PropTypes.func,
    onFocusParent: PropTypes.func,
    onSiblingsExpand: PropTypes.func,
    open: PropTypes.bool,
    parentId: PropTypes.string,
    renderItemTitle: PropTypes.func,
    siblingsLength: PropTypes.number,
    title: customPropTypes.itemShorthand,
    treeItemRtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeItemBehavior,
  }

  actionHandlers = {
    performClick: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleTitleClick(e)
    },
    focusParent: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleParentFocus(e)
    },
    collapse: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleTitleClick(e)
    },
    expand: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleTitleClick(e)
    },
    focusFirstChild: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleFocusFirstChild(e)
    },
    expandSiblings: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleSiblingsExpand(e)
    },
  }

  eventComesFromChildItem = e => {
    return e.currentTarget !== e.target
  }

  handleTitleClick = e => {
    _.invoke(this.props, 'onTitleClick', e, this.props)
  }

  handleParentFocus = e => {
    _.invoke(this.props, 'onFocusParent', e, this.props)
  }

  handleFocusFirstChild = e => {
    _.invoke(this.props, 'onFocusFirstChild', e, this.props)
  }

  handleSiblingsExpand = e => {
    _.invoke(this.props, 'onSiblingsExpand', e, this.props)
  }

  handleTitleOverrides = (predefinedProps: TreeTitleProps) => ({
    onClick: (e, titleProps) => {
      this.handleTitleClick(e)
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  renderContent() {
    const { items, title, renderItemTitle, open, level, siblingsLength, index } = this.props
    const hasSubtree = !_.isNil(items)

    return TreeTitle.create(title, {
      defaultProps: {
        className: TreeItem.slotClassNames.title,
        open,
        hasSubtree,
        as: hasSubtree ? 'span' : 'a',
        level,
        siblingsLength,
        index,
      },
      render: renderItemTitle,
      overrideProps: this.handleTitleOverrides,
    })
  }

  renderComponent({ ElementType, accessibility, classes, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeItem.create = createShorthandFactory({
  Component: TreeItem,
  mappedProp: 'title',
})

/**
 * A TreeItem renders an item of a Tree.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof TreeItem, TreeItemProps, 'li'>(TreeItem)
