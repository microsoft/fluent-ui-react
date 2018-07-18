import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import headerSubheaderRules from './headerSubheaderRules'
import headerSubheaderVariables from './headerSubheaderVariables'

/**
 * Headers may contain subheaders.
 */
class HeaderSubheader extends UIComponent<any, any> {
  static create: Function

  static className = 'ui-header__subheader'

  static displayName = 'HeaderSubheader'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Background color of the header. */
    background: PropTypes.string,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Color of the subheader. */
    color: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
  }

  static handledProps = ['as', 'background', 'children', 'className', 'color', 'content']

  static rules = headerSubheaderRules

  static variables = headerSubheaderVariables

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }))

export default HeaderSubheader
