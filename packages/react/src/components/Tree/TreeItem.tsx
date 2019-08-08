import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
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

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** The index of the item among its sibbling */
  indexInTree?: number

  /** Array of props for sub tree. */
  items?: ShorthandCollection<TreeItemProps>

  level?: number

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<TreeItemProps>

  /** Called when the item's first child is focused. */
  onFirstChildFocus?: ComponentEventHandler<TreeItemProps>

  /** Called when the item's parent is focused. */
  onParentFocus?: ComponentEventHandler<TreeItemProps>

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean

  parent?: ShorthandValue<TreeItemProps>

  indexInSubtree?: number

  siblings?: ShorthandCollection<TreeItemProps>

  /**
   * A custom render iterator for rendering each Accordion panel title.
   * The default component, props, and children are available for each panel title.
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
    items: customPropTypes.collectionShorthand,
    indexInTree: PropTypes.number,
    exclusive: PropTypes.bool,
    level: PropTypes.number,
    onTitleClick: PropTypes.func,
    onFirstChildFocus: PropTypes.func,
    onParentFocus: PropTypes.func,
    open: PropTypes.bool,
    parent: customPropTypes.itemShorthand,
    indexInSubtree: PropTypes.number,
    renderItemTitle: PropTypes.func,
    siblings: customPropTypes.collectionShorthand,
    treeItemRtlAttributes: PropTypes.func,
    title: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeItemBehavior,
  }

  itemRef = React.createRef<HTMLElement>()
  treeRef = React.createRef<HTMLElement>()

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
    focusSubtree: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleFirstChildFocus(e)
    },
  }

  eventComesFromChildItem = e => {
    return e.currentTarget !== e.target
  }

  handleTitleClick = e => {
    _.invoke(this.props, 'onTitleClick', e, this.props)
  }

  handleParentFocus = e => {
    _.invoke(this.props, 'onParentFocus', e, this.props)
  }

  handleFirstChildFocus = e => {
    _.invoke(this.props, 'onFirstChildFocus', e, this.props)
  }

  handleTitleOverrides = (predefinedProps: TreeTitleProps) => ({
    onClick: (e, titleProps) => {
      this.handleTitleClick(e)
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  renderContent() {
    const {
      items,
      title,
      renderItemTitle,
      open,
      level,
      siblings,
      indexInTree,
      indexInSubtree,
    } = this.props
    const hasSubtree = !_.isNil(items)

    return TreeTitle.create(title, {
      defaultProps: {
        className: TreeItem.slotClassNames.title,
        open,
        hasSubtree,
        as: hasSubtree ? 'span' : 'a',
        level,
        siblingsLength: siblings.length,
        indexInTree,
        indexInSubtree,
      },
      render: renderItemTitle,
      overrideProps: this.handleTitleOverrides,
    })
  }

  renderComponent({ ElementType, accessibility, classes, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <Ref innerRef={this.itemRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
          {...unhandledProps}
        >
          {childrenExist(children) ? children : this.renderContent()}
        </ElementType>
      </Ref>
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
