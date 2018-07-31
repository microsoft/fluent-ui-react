import PropTypes from 'prop-types'
import React from 'react'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'
import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'
import { ToggleButtonBehavior } from '../../lib/accessibility/Behaviors/behaviors'

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

    accBehavior: PropTypes.string,
  }

  static handledProps = ['as', 'circular', 'className', 'content', 'type', 'accBehavior']

  static defaultProps = {
    as: 'button',
  }

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.button,
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
