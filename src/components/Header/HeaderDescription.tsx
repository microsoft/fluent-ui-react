import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import headerDescriptionRules from './headerDescriptionRules'

/**
 * Headers may contain description.
 */
class HeaderDescription extends UIComponent<any, any> {
  static create: Function

  static className = 'ui-header__description'

  static displayName = 'HeaderDescription'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
  }

  static defaultProps = {
    as: 'p',
  }

  static handledProps = ['as', 'children', 'className', 'content']

  static rules = headerDescriptionRules

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

HeaderDescription.create = createShorthandFactory(HeaderDescription, content => ({ content }))

export default HeaderDescription
