import * as React from 'react'
import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  UIComponent,
  UIComponentProps,
  createShorthandFactory,
  childrenExist,
  isFromKeyboard,
} from '../../lib'
import { ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import Icon from '../Icon/Icon'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'

export interface ToolbarMenuItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A toolbar item can be active. */
  active?: boolean

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue
}

export interface ToolbarMenuItemState {
  isFromKeyboard: boolean
}

class ToolbarMenuItem extends UIComponent<WithAsProp<ToolbarMenuItemProps>, ToolbarMenuItemState> {
  static displayName = 'ToolbarMenuItem'

  static className = 'ui-toolbar__menuitem'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'button',
    accessibility: defaultBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, content, disabled, icon } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        disabled={disabled}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Icon.create(icon, { defaultProps: { xSpacing: !!content ? 'after' : 'none' } })}
            {content}
          </>
        )}
      </ElementType>
    )
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }
}

ToolbarMenuItem.create = createShorthandFactory({
  Component: ToolbarMenuItem,
  mappedProp: 'content',
})

/**
 * Toolbar item.
 * FIXME add meaningful description.
 */
export default withSafeTypeForAs<typeof ToolbarMenuItem, ToolbarMenuItemProps, 'button'>(
  ToolbarMenuItem,
)
