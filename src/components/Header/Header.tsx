import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import HeaderDescription from './HeaderDescription'
import headerRules from './headerRules'
import headerVariables from './headerVariables'

/**
 * A header provides a short summary of content
 * @accessibility
 * Headings communicate the organization of the content on the page. Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation.
 * Nest headings by their rank (or level). The most important heading has the rank 1 (<h1>), the least important heading rank 6 (<h6>). Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
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

    /** Shorthand for Header.Description. */
    description: customPropTypes.itemShorthand,

    /** Align header content. */
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justified']),
  }

  static defaultProps = {
    as: 'h1',
  }

  static handledProps = ['as', 'children', 'className', 'content', 'description', 'textAlign']

  static rules = headerRules

  static variables = headerVariables

  static Description = HeaderDescription

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, description } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {children}
        </ElementType>
      )
    }

    const descriptionElement = HeaderDescription.create(description, { autoGenerateKey: false })

    return (
      <ElementType {...rest} className={classes.root}>
        {content}
        {descriptionElement}
      </ElementType>
    )
  }
}

export default Header
