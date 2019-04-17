import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle, { TreeTitleProps } from './TreeTitle'
import { defaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'
import {
  ComponentEventHandler,
  ReactProps,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../types'

export interface TreeItemSlotClassNames {
  title: string
  subtree: string
}

export interface TreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** Initial open value. */
  defaultOpen?: boolean

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

class TreeItem extends UIComponent<ReactProps<TreeItemProps>> {
  static create: Function

  static displayName = 'TreeItem'

  static className = 'ui-tree__item'

  static slotClassNames: TreeItemSlotClassNames = {
    title: `${TreeItem.className}__title`,
    subtree: `${TreeItem.className}__subtree`,
  }

  static autoControlledProps = ['open']

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    defaultOpen: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    index: PropTypes.number,
    exclusive: PropTypes.bool,
    onTitleClick: PropTypes.func,
    open: PropTypes.bool,
    renderItemTitle: PropTypes.func,
    treeItemRtlAttributes: PropTypes.func,
    title: customPropTypes.itemShorthand,
  }

  public static defaultProps = {
    as: 'li',
    accessibility: defaultBehavior,
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
          },
          render: renderItemTitle,
          overrideProps: this.handleTitleOverrides,
        })}
        {open &&
          Tree.create(items, {
            defaultProps: {
              accessibility: defaultBehavior,
              className: TreeItem.slotClassNames.subtree,
              exclusive,
              renderItemTitle,
            },
          })}
      </>
    )
  }

  renderComponent({ ElementType, accessibility, classes, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeItem.create = createShorthandFactory({ Component: TreeItem, mappedProp: 'title' })

export default TreeItem
