import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import HeaderDescription from './HeaderDescription'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'

export interface HeaderProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  description?: ShorthandValue
  textAlign?: 'left' | 'center' | 'right' | 'justified'
  renderDescription?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
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
class Header extends UIComponent<Extendable<HeaderProps>, any> {
  static className = 'ui-header'

  static displayName = 'Header'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for Header.Description. */
    description: customPropTypes.itemShorthand,

    /** Align header content. */
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justified']),

    /**
     * A custom render function the description slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderDescription: PropTypes.func,

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
    const { children, content, description, renderDescription } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {content}
        {HeaderDescription.create(description, {
          defaultProps: {
            variables: {
              ...(v.descriptionColor && { color: v.descriptionColor }),
            },
          },
          render: renderDescription,
        })}
      </ElementType>
    )
  }
}

export default Header
