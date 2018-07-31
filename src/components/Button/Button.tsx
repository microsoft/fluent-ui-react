import PropTypes from 'prop-types'
import React, { ReactNode, CSSProperties } from 'react'

import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'
import Icon from '../Icon'
import Text from '../Text'

export type IconPosition = 'before' | 'after'
export type ButtonType = 'primary' | 'secondary'

export interface IButtonProps {
  as?: string
  children?: ReactNode
  circular?: boolean
  className?: string
  content?: ReactNode
  fluid?: boolean
  icon?: boolean | string
  iconPosition?: IconPosition
  style?: CSSProperties
  type?: ButtonType
}

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Button extends UIComponent<IButtonProps, any> {
  public static displayName = 'Button'

  public static className = 'ui-button'

  public static rules = buttonRules

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

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Button can have an icon. */
    icon: customPropTypes.some([PropTypes.bool, PropTypes.string]),

    /** An icon button can format an Icon to appear before or after the button */
    iconPosition: PropTypes.oneOf(['before', 'after']),

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),
  }

  public static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'fluid',
    'icon',
    'iconPosition',
    'type',
  ]

  public static defaultProps = {
    as: 'button',
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IButtonProps>): ReactNode {
    const { children, content, icon, iconPosition, type } = this.props
    const primary = type === 'primary'

    const getContent = (): ReactNode => {
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
      <ElementType {...rest} className={classes.root}>
        {getContent()}
      </ElementType>
    )
  }
}

export default Button
