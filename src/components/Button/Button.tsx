import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import Icon from '../Icon'
import { ButtonBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

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
class Button extends UIComponent<any, any> {
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

    /** An icon button can format an Icon to appear before or after the button */
    iconPosition: PropTypes.oneOf(['before', 'after']),

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

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
    'iconPosition',
    'onClick',
    'styles',
    'type',
    'variables',
  ]

  public static defaultProps = {
    as: 'button',
    accessibility: ButtonBehavior as Accessibility,
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

    if (hasChildren) {
      return children
    }

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rest}
      >
        {iconPosition !== 'after' && this.renderIcon(variables)}
        {content && <span className={classes.content}>{content}</span>}
        {iconPosition === 'after' && this.renderIcon(variables)}
      </ElementType>
    )
  }

  public renderIcon = variables => {
    const { disabled, icon, iconPosition, content, type } = this.props

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
}

export default Button
