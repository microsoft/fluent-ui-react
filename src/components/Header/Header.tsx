import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import HeaderDescription from './HeaderDescription'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'

export interface IHeaderProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  description?: ItemShorthand
  textAlign?: 'left' | 'center' | 'right' | 'justified'
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A header provides a short summary of content
 * @accessibility
 * Headings communicate the organization of the content on the page. Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation.
 * Nest headings by their rank (or level). The most important heading has the rank 1 (<h1>), the least important heading rank 6 (<h6>). Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
 *
 *
 * Other considerations:
 *  - when the description property is used in header, readers will narrate both header content and description within the element.
 *    In addition to that, both will be displayed in the list of headings.
 */
class Header extends UIComponent<Extendable<IHeaderProps>, any> {
  static className = 'ui-header'

  static displayName = 'Header'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for Header.Description. */
    description: customPropTypes.itemShorthand,

    /** Align header content. */
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justified']),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'h1',
  }

  static Description = HeaderDescription

  renderComponent({ ElementType, classes, variables: v, rest }) {
    const { children, content, description: descriptionContentOrProps } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {children}
        </ElementType>
      )
    }

    const descriptionElement = HeaderDescription.create(descriptionContentOrProps, {
      defaultProps: {
        variables: {
          ...(v.descriptionColor && { color: v.descriptionColor }),
        },
      },
    })

    return (
      <ElementType {...rest} className={classes.root}>
        {content}
        {descriptionElement}
      </ElementType>
    )
  }
}

export default Header
