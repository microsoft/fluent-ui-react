import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle from './TreeTitle'

import {
  AutoControlledComponent,
  childrenExist,
  customPropTypes,
  createShorthandFactory,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'

export interface TreeListItemProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Initial activeIndex value. */
  defaultOpen?: boolean

  /** Shorthand array of props for sub tree. */
  items?: any[]

  /**
   * Called when a tree title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All title props.
   */
  onItemClick?: ComponentEventHandler<TreeListItemProps>

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
  renderTitle?: ShorthandRenderFunction

  /** Shorthand for TreeTitle. */
  title?: ShorthandValue
}

export interface TreeListItemState {
  open?: boolean
}

class TreeListItem extends AutoControlledComponent<TreeListItemProps, TreeListItemState> {
  static create: Function

  static className = 'ui-tree__list__item'

  static displayName = 'TreeListItem'

  static autoControlledProps = ['open']

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    defaultOpen: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    onItemClick: PropTypes.func,
    open: PropTypes.bool,
    renderTitle: PropTypes.func,
    title: customPropTypes.itemShorthand,
  }

  public static defaultProps = {
    as: 'li',
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      e.preventDefault()
      this.trySetState({
        open: !this.state.open,
      })

      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onItemClick', e, titleProps)
    },
  })

  renderContent() {
    const { items, title, renderTitle } = this.props
    const { open } = this.state

    return (
      <>
        {TreeTitle.create(title, {
          defaultProps: {
            open,
            hasSubtree: !!(items && items.length),
          },
          render: renderTitle,
          overrideProps: this.handleItemOverrides,
        })}
        {items &&
          open &&
          Tree.create('', {
            defaultProps: {
              items,
              nested: true,
              renderTitle,
            },
          })}
      </>
    )
  }

  renderComponent({ ElementType, accessibility, classes, rest, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeListItem.create = createShorthandFactory(TreeListItem, 'content')

export default TreeListItem
