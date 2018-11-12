import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import Icon from '../Icon/Icon'
import Slot from '../Slot/Slot'
import { buttonBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  ComponentEventHandler,
  Extendable,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import ButtonGroup from './ButtonGroup'
import isFromKeyboard from '../../lib/isFromKeyboard'
import {
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface ButtonProps
  extends UIComponentProps<any, any>,
    ContentComponentProps,
    ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default buttonBehavior
   */
  accessibility?: Accessibility

  /** A button can appear circular. */
  circular?: boolean

  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** A button can take the width of its container. */
  fluid?: boolean

  /** Button can have an icon. */
  icon?: ShorthandValue

  /** A button may indicate that it has only icon. */
  iconOnly?: boolean

  /** An icon button can format an Icon to appear before or after the button */
  iconPosition?: 'before' | 'after'

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ButtonProps>

  /** A button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /** A button can be formatted to show only text in order to indicate some less-pronounced actions. */
  text?: boolean

  /** A button can be formatted to show different levels of emphasis. */
  secondary?: boolean
}

export interface ButtonState {
  [isFromKeyboard.propertyName]: boolean
}

/**
 * A button indicates a possible user action.
 * @accessibility
 * Other considerations:
 *  - for disabled buttons, add 'disabled' attribute so that the state is properly recognized by the screen reader
 *  - if button includes icon only, textual representation needs to be provided by using 'title', 'aria-label', or 'aria-labelledby' attributes
 */
class Button extends UIComponent<Extendable<ButtonProps>, ButtonState> {
  static create: Function

  public static displayName = 'Button'

  public static className = 'ui-button'

  public static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    circular: PropTypes.bool,
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    iconOnly: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['before', 'after']),
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    text: PropTypes.bool,
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    accessibility: PropTypes.func,
    renderIcon: PropTypes.func,
  }

  public static defaultProps = {
    as: 'button',
    accessibility: buttonBehavior as Accessibility,
  }

  static Group = ButtonGroup

  public state = isFromKeyboard.initial

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { children, content, disabled, iconPosition } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...rest}
      >
        {hasChildren && children}
        {!hasChildren && iconPosition !== 'after' && this.renderIcon(variables, styles)}
        {Slot.create(!hasChildren && content, {
          defaultProps: { as: 'span', className: classes.content },
        })}
        {!hasChildren && iconPosition === 'after' && this.renderIcon(variables, styles)}
      </ElementType>
    )
  }

  public renderIcon = (variables, styles) => {
    const { icon, iconPosition, content, renderIcon } = this.props

    return Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
        variables: variables.icon,
      },
      render: renderIcon,
    })
  }

  private handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.state())

    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Button.create = createShorthandFactory(Button, content => ({ content }))

export default Button
