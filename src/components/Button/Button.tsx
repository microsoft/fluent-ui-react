import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
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
import ButtonGroup from './ButtonGroup'

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
  text?: boolean
  type?: 'primary' | 'secondary'
  accessibility?: Accessibility
  styles?: IComponentPartStylesInput
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

    /** A button can be formatted to show only text in order to indicate some less-pronounced actions. */
    text: PropTypes.bool,

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
      >
        {hasChildren && children}
        {!hasChildren && iconPosition !== 'after' && this.renderIcon()}
        {!hasChildren && content && <span className={classes.content}>{content}</span>}
        {!hasChildren && iconPosition === 'after' && this.renderIcon()}
      </ElementType>
    )
  }

  public renderIcon = () => {
    const { icon, iconPosition, content } = this.props

    return Icon.create(icon, {
      defaultProps: {
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
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
}

Button.create = createShorthandFactory(Button, content => ({ content }))

export default Button
