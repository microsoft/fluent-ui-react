import * as PropTypes from 'prop-types'
import * as React from 'react'
import whatInput from 'what-input'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import Icon from '../Icon'
import { ButtonBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import {
  Extendable,
  ItemShorthand,
  ReactChildren,
  ComponentEventHandler,
} from '../../../types/utils'

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
  type?: 'primary' | 'secondary'
  accessibility?: Accessibility
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A button.
 * @accessibility
 * Default behavior: ButtonBehavior
 *  - adds role='button' if element type is other than 'button'
 *
 *
 * Other considerations:
 *  - for disabled buttons, add 'disabled' attribute so that the state is properly recognized by the screen reader
 *  - if button includes icon only, textual representation needs to be provided by using 'title', 'aria-label', or 'aria-labelledby' attributes
 */
class Button extends UIComponent<Extendable<IButtonProps>, any> {
  public static displayName = 'Button'

  public static className = 'ui-button'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
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
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
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
    'type',
    'variables',
  ]

  public static defaultProps = {
    as: 'button',
    accessibility: ButtonBehavior as Accessibility,
  }

  public state = {
    isLastFocusFromMouse: false,
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    rest,
  }): React.ReactNode {
    const { children, content, disabled, iconPosition } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rest}
        onFocus={this.handleFocus}
      >
        {hasChildren && children}
        {!hasChildren && iconPosition !== 'after' && this.renderIcon(variables)}
        {!hasChildren && content && <span className={classes.content}>{content}</span>}
        {!hasChildren && iconPosition === 'after' && this.renderIcon(variables)}
      </ElementType>
    )
  }

  public renderIcon = variables => {
    const { icon, iconPosition, content, type } = this.props

    return Icon.create(icon, {
      defaultProps: {
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
        variables: {
          color:
            type === 'primary'
              ? variables.typePrimaryColor
              : type === 'secondary'
                ? variables.typeSecondaryColor
                : variables.color,
        },
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
    const { onFocus } = this.props

    this.setState({ isLastFocusFromMouse: whatInput.ask() === 'mouse' })

    if (onFocus) {
      onFocus(e, this.props)
    }
  }
}

export default Button
