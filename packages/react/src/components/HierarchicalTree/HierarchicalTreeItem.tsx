import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import HierarchicalTree, { HierarchicalTreeProps } from './HierarchicalTree'
import HierarchicalTreeTitle, { HierarchicalTreeTitleProps } from './HierarchicalTreeTitle'
import { hierarchicalTreeItemBehavior, hierarchicalSubtreeBehavior } from '../../lib/accessibility'
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
  ShorthandFactory,
} from '../../lib'
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandRenderFunction,
  ShorthandValue,
  withSafeTypeForAs,
  ShorthandCollection,
} from '../../types'
import { getFirstFocusable } from '../../lib/accessibility/FocusZone/focusUtilities'

export interface HierarchicalTreeItemSlotClassNames {
  title: string
  subtree: string
}

export interface HierarchicalTreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** The index of the item among its sibbling */
  index?: number

  /** Array of props for sub tree. */
  items?: ShorthandValue<HierarchicalTreeProps> | ShorthandCollection<HierarchicalTreeItemProps>

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<HierarchicalTreeItemProps>

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
  renderItemTitle?: ShorthandRenderFunction<HierarchicalTreeTitleProps>

  /** Properties for TreeTitle. */
  title?: ShorthandValue<HierarchicalTreeTitleProps>
}

class HierarchicalTreeItem extends UIComponent<WithAsProp<HierarchicalTreeItemProps>> {
  static create: ShorthandFactory<HierarchicalTreeItemProps>

  static displayName = 'HierarchicalTreeItem'

  static className = 'ui-hierarchicaltree__item'

  static slotClassNames: HierarchicalTreeItemSlotClassNames = {
    title: `${HierarchicalTreeItem.className}__title`,
    subtree: `${HierarchicalTreeItem.className}__subtree`,
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
    title: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'li',
    accessibility: hierarchicalTreeItemBehavior,
  }

  itemRef = React.createRef<HTMLElement>()
  treeRef = React.createRef<HTMLElement>()

  actionHandlers = {
    performClick: e => {
      e.preventDefault()
      e.stopPropagation()

      _.invoke(this.props, 'onTitleClick', e, this.props)
    },
    receiveFocus: e => {
      e.preventDefault()
      e.stopPropagation()

      // Focuses the title if the event comes from a child item.
      if (this.eventComesFromChildItem(e)) {
        this.itemRef.current.focus()
      }
    },
    collapse: e => {
      e.preventDefault()
      e.stopPropagation()

      // Handle click on title if the keyboard event was dispatched on that title
      if (!this.eventComesFromChildItem(e)) {
        this.handleTitleClick(e)
      }
    },
    expand: e => {
      e.preventDefault()
      e.stopPropagation()

      this.handleTitleClick(e)
    },
    focusSubtree: e => {
      e.preventDefault()
      e.stopPropagation()

      const element = getFirstFocusable(this.treeRef.current, this.treeRef.current, true)
      if (element) {
        element.focus()
      }
    },
  }

  eventComesFromChildItem = e => {
    return e.currentTarget !== e.target
  }

  handleTitleClick = e => {
    _.invoke(this.props, 'onTitleClick', e, this.props)
  }

  handleTitleOverrides = (predefinedProps: HierarchicalTreeTitleProps) => ({
    onClick: (e, titleProps) => {
      this.handleTitleClick(e)
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  renderContent() {
    const { items, title, renderItemTitle, open, exclusive } = this.props
    const hasSubtree = !_.isNil(items)

    return (
      <>
        {HierarchicalTreeTitle.create(title, {
          defaultProps: {
            className: HierarchicalTreeItem.slotClassNames.title,
            open,
            hasSubtree,
            as: hasSubtree ? 'span' : 'a',
          },
          render: renderItemTitle,
          overrideProps: this.handleTitleOverrides,
        })}
        {hasSubtree && open && (
          <Ref innerRef={this.treeRef}>
            {HierarchicalTree.create(items, {
              defaultProps: {
                accessibility: hierarchicalSubtreeBehavior,
                className: HierarchicalTreeItem.slotClassNames.subtree,
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
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {childrenExist(children) ? children : this.renderContent()}
        </ElementType>
      </Ref>
    )
  }
}

HierarchicalTreeItem.create = createShorthandFactory({
  Component: HierarchicalTreeItem,
  mappedProp: 'title',
})

/**
 * A TreeItem renders an item of a Tree.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof HierarchicalTreeItem, HierarchicalTreeItemProps, 'li'>(
  HierarchicalTreeItem,
)
