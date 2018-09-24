import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import Icon from '../Icon'
import { ButtonBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ItemShorthand,
  ReactChildren,
  ComponentEventHandler,
} from '../../../types/utils'
import ButtonGroup from './ButtonGroup'
import isFromKeyboard from '../../lib/isFromKeyboard'

export interface IButtonProps {
  as?: any
  children?: ReactChildren
  circular?: boolean
  className?: string
  disabled?: boolean
  content?: React.ReactNode
  fluid?: boolean
  icon?: ItemShorthand
  iconOnly?: boolean
  iconPosition?: 'before' | 'after'
  onClick?: ComponentEventHandler<IButtonProps>
  onFocus?: ComponentEventHandler<IButtonProps>
  text?: boolean
  type?: 'primary' | 'secondary'
  accessibility?: Accessibility
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A button.
 * @accessibility
 * Other considerations:
 *  - for disabled buttons, add 'disabled' attribute so that the state is properly recognized by the screen reader
 *  - if button includes icon only, textual representation needs to be provided by using 'title', 'aria-label', or 'aria-labelledby' attributes
 */
class Button extends UIComponent<Extendable<IButtonProps>, any> {
  static create: Function

  public static displayName = 'Button'

  public static className = 'ui-button'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Button content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional css class name or space separated class names to apply **/
    className: PropTypes.string,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Button can have an icon. */
    icon: customPropTypes.itemShorthand,

    /** A button may indicate that it has only icon. */
    iconOnly: PropTypes.bool,

    /** An icon button can format an Icon to appear before or after the button */
    iconPosition: PropTypes.oneOf(['before', 'after']),

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called after user's focus.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /** A button can be formatted to show only text in order to indicate some less-pronounced actions. */
    text: PropTypes.bool,

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Styles to apply to this component instance **/
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'circular',
    'className',
    'content',
    'disabled',
    'fluid',
    'icon',
    'iconOnly',
    'iconPosition',
    'onClick',
    'onFocus',
    'styles',
    'text',
    'type',
    'variables',
  ]

  public static defaultProps = {
    as: 'button',
    accessibility: ButtonBehavior as Accessibility,
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
        {!hasChildren && content && <span className={classes.content}>{content}</span>}
        {!hasChildren && iconPosition === 'after' && this.renderIcon(variables, styles)}
      </ElementType>
    )
  }

  public renderIcon = (variables, styles) => {
    const { icon, iconPosition, content } = this.props

    return Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
        variables: variables.icon,
      },
    })
  }

  private handleClick = (e: React.SyntheticEvent) => {
    const { onClick, disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e, this.props)
    }
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(isFromKeyboard.state())

    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

Button.create = createShorthandFactory(Button, content => ({ content }))

export default Button
