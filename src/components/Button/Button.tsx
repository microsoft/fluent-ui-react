import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import buttonStyles from '../../themes/teams/components/Button/buttonStyles'
import buttonVariables from '../../themes/teams/components/Button/buttonVariables'
import Icon from '../Icon'
import Text from '../Text'
import { ButtonBehavior } from '../../lib/accessibility'

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

  public static styles = buttonStyles

  public static variables = buttonVariables

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
    icon: customPropTypes.some([PropTypes.bool, PropTypes.string]),

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

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
    'type',
  ]

  public static defaultProps = {
    as: 'button',
    accessibility: ButtonBehavior,
  }

  public renderComponent({ ElementType, classes, accessibility, rest }): React.ReactNode {
    const { children, content, disabled, icon, iconPosition, type } = this.props
    const primary = type === 'primary'

    const getContent = (): React.ReactNode => {
      if (childrenExist(children)) {
        return children
      }

      const iconIsAfterButton = iconPosition === 'after'
      const renderedContent = [
        content && <Text key="btn-content" truncated content={content} />,
        icon &&
          typeof icon === 'string' && (
            <Icon
              key="btn-icon"
              name={icon}
              xSpacing={!content ? 'none' : iconIsAfterButton ? 'before' : 'after'}
              color={primary ? 'white' : 'black'}
            />
          ),
      ].filter(Boolean)

      return iconIsAfterButton ? renderedContent : renderedContent.reverse()
    }

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rest}
      >
        {getContent()}
      </ElementType>
    )
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
