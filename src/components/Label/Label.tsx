import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import labelRules from './labelRules'
import labelVariables from './labelVariables'

export interface LabelProps {
  circular?: boolean
  content?: ReactNode
}

/**
 * A label displays content classification
 */
class Label extends UIComponent<LabelProps, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A label can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Function or object for overriding the variables for the component. */
    variables: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  static handledProps = ['as', 'children', 'circular', 'className', 'content', 'variables']

  static defaultProps = {
    as: 'label',
  }

  static rules = labelRules

  static variables = labelVariables

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
