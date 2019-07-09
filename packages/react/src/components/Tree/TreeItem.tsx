import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle, { TreeTitleProps } from './TreeTitle'
import { treeItemBehavior, subtreeBehavior } from '../../lib/accessibility'
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
} from '../../types'
import { getFirstFocusable } from '../../lib/accessibility/FocusZone/focusUtilities'

export interface TreeItemSlotClassNames {
  title: string
  subtree: string
}

export interface TreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeItemBehavior
   */
  accessibility?: Accessibility

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** The index of the item among its sibbling */
  index: number

  /** Array of props for sub tree. */
  items?: ShorthandValue[]

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<TreeItemProps>

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean

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
  title?: ShorthandValue
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
    index: PropTypes.number,
    exclusive: PropTypes.bool,
    onTitleClick: PropTypes.func,
    open: PropTypes.bool,
    renderItemTitle: PropTypes.func,
    treeItemRtlAttributes: PropTypes.func,
    title: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'li',
    accessibility: treeItemBehavior,
  }

  itemRef = React.createRef<HTMLElement>()
  treeRef = React.createRef<HTMLElement>()

  actionHandlers = {
    performClick: e => {
      e.preventDefault()
      e.stopPropagation()

      _.invoke(this.props, 'onTitleClick', e, this.props)
    },
    collapseOrReceiveFocus: e => {
      const { items, open } = this.props

      e.preventDefault()

      // Focuses the title if the event comes from a child item.
      if (e.currentTarget !== e.target && items && items.length) {
        e.stopPropagation()
        this.itemRef.current.focus()
      } else if (open) {
        e.stopPropagation()
        _.invoke(this.props, 'onTitleClick', e, this.props)
      }
    },
    expandOrPassFocus: e => {
      const { open } = this.props

      e.preventDefault()
      e.stopPropagation()

      if (!open) {
        _.invoke(this.props, 'onTitleClick', e, this.props)
      } else {
        const element = getFirstFocusable(this.treeRef.current, this.treeRef.current, true)
        if (element) {
          element.focus()
        }
      }
    },
  }

  handleTitleOverrides = (predefinedProps: TreeTitleProps) => ({
    onClick: (e, titleProps) => {
      _.invoke(this.props, 'onTitleClick', e, this.props)
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  renderContent() {
    const { items, title, renderItemTitle, open, exclusive } = this.props
    const hasSubtree = !!(items && items.length)

    return (
      <>
        {TreeTitle.create(title, {
          defaultProps: {
            className: TreeItem.slotClassNames.title,
            open,
            hasSubtree,
            as: hasSubtree ? 'span' : 'a',
          },
          render: renderItemTitle,
          overrideProps: this.handleTitleOverrides,
        })}
        {hasSubtree && open && (
          <Ref innerRef={this.treeRef}>
            {Tree.create(items, {
              defaultProps: {
                accessibility: subtreeBehavior,
                className: TreeItem.slotClassNames.subtree,
                exclusive,
                renderItemTitle,
              },
            })}
          </Ref>
        )}
      </>
    )
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

TreeItem.create = createShorthandFactory({ Component: TreeItem, mappedProp: 'title' })

export default withSafeTypeForAs<typeof TreeItem, TreeItemProps, 'li'>(TreeItem)
