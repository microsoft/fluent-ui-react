import PropTypes from 'prop-types'
import React from 'react'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'
import { A11yBehaviorType, A11yBehaviorFactory } from '../../lib/accessibility/A11yBehaviorFactory'

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Button extends UIComponent<any, any> {
  static displayName = 'Button'

  static className = 'ui-button'

  static rules = buttonRules

  static variables = buttonVariables

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    a11yType: PropTypes.string,
  }

  static handledProps = ['as', 'circular', 'className', 'content', 'type', 'a11yType']

  static defaultProps = {
    as: 'button',
  }

  constructor(props, state) {
    super(props, state)
    const a11yType: string = props.a11yType
    this.accBehavior = A11yBehaviorFactory.createBehavior(
      A11yBehaviorType[a11yType] || A11yBehaviorType.button,
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}
export default Button
