import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle from './TreeTitle'
import { defaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  AutoControlledComponent,
  childrenExist,
  customPropTypes,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'
import { ReactProps, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'

export interface TreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Initial open value. */
  defaultOpen?: boolean

  /** Array of props for sub tree. */
  items?: ShorthandValue[]

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

export interface TreeItemState {
  open?: boolean
}

class TreeItem extends AutoControlledComponent<ReactProps<TreeItemProps>, TreeItemState> {
  static create: Function

  static className = 'ui-tree__item'

  static displayName = 'TreeItem'

  static autoControlledProps = ['open']

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
    defaultOpen: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    open: PropTypes.bool,
    renderItemTitle: PropTypes.func,
    treeItemRtlAttributes: PropTypes.func,
    title: customPropTypes.itemShorthand,
  }

  public static defaultProps = {
    as: 'li',
    accessibility: defaultBehavior,
  }

  handleTitleOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      e.preventDefault()
      this.trySetState({
        open: !this.state.open,
      })
      _.invoke(predefinedProps, 'onClick', e, titleProps)
    },
  })

  renderContent() {
    const { items, title, renderItemTitle } = this.props
    const { open } = this.state

    const hasSubtree = !!(items && items.length)

    return (
      <>
        {TreeTitle.create(title, {
          defaultProps: {
            open,
            hasSubtree,
          },
          render: renderItemTitle,
          overrideProps: this.handleTitleOverrides,
        })}
        {hasSubtree && open && <Tree items={items} renderItemTitle={renderItemTitle} />}
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

TreeItem.create = createShorthandFactory(TreeItem, 'title')

export default TreeItem
