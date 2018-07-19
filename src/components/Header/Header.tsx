import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import HeaderSubheader from './HeaderSubheader'
import headerRules from './headerRules'
import headerVariables from './headerVariables'

/**
 * A header provides a short summary of content
 */
class Header extends UIComponent<any, any> {
  static className = 'ui-header'

  static displayName = 'Header'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for Header.Subheader. */
    subheader: customPropTypes.itemShorthand,

    /** An element type to render as for the  for Header.Subheader. */
    subheaderAs: PropTypes.string,

    /** Align header content. */
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justified']),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'subheader',
    'subheaderAs',
    'textAlign',
  ]

  static defaultProps = {
    as: 'h1',
    subheaderAs: 'h2',
  }

  static rules = headerRules

  static variables = headerVariables

  static Subheader = HeaderSubheader

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, subheader, subheaderAs, textAlign } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {children}
        </ElementType>
      )
    }

    const subheaderElement = HeaderSubheader.create(
      { content: subheader, as: subheaderAs, textAlign },
      { autoGenerateKey: false },
    )

    return (
      <React.Fragment>
        <ElementType {...rest} className={classes.root}>
          {content}
        </ElementType>
        {subheader && subheaderElement}
      </React.Fragment>
    )
  }
}

export default Header
