import PropTypes from 'prop-types'
import React, { ReactNode, CSSProperties } from 'react'

import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'

export type ButtonType = 'primary' | 'secondary'

export interface IButtonProps {
  as?: string
  children?: ReactNode
  circular?: boolean
  className?: string
  content?: ReactNode
  fluid?: boolean
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
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Button
