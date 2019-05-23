import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
} from '../../lib'
import { ComponentEventHandler, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

import Icon from '../Icon/Icon'

export interface ToolbarItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarItemProps>
}

class ToolbarItem extends UIComponent<WithAsProp<ToolbarItemProps>> {
  static displayName = 'ToolbarItem'

  static className = 'ui-toolbar__item'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    icon: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    as: 'button',
    accessibility: defaultBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { icon, children } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? children : Icon.create(icon)}
      </ElementType>
    )
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }
}

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' })

/**
 * Toolbar item.
 * TODO: add meaningful description
 */
export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem)
