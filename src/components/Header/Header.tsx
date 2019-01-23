import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  customPropTypes,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
} from '../../lib'
import HeaderDescription from './HeaderDescription'
import { ReactProps, ShorthandValue } from '../../../types/utils'

export interface HeaderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /** Shorthand for Header.Description. */
  description?: ShorthandValue

  /** Align header content. */
  textAlign?: 'left' | 'center' | 'right' | 'justified'
}

/**
 * A header provides a short summary of content.
 * @accessibility
 * Headings communicate the organization of the content on the page. Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation.
 * Nest headings by their rank (or level). The most important heading has the rank 1 (<h1>), the least important heading rank 6 (<h6>). Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
 *
 * Other considerations:
 *  - when the description property is used in header, readers will narrate both header content and description within the element.
 *    In addition to that, both will be displayed in the list of headings.
 */
class Header extends UIComponent<ReactProps<HeaderProps>, any> {
  static className = 'ui-header'

  static displayName = 'Header'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    description: customPropTypes.itemShorthand,
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justified']),
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'h1',
  }

  static Description = HeaderDescription

  renderComponent({ ElementType, classes, variables: v, unhandledProps }) {
    const { children, description, content } = this.props

    const hasChildren = childrenExist(children)
    const contentElement = childrenExist(children) ? children : content

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({
          forElements: [children, content],
          condition: !description,
        })}
        {...unhandledProps}
        className={classes.root}
      >
        {rtlTextContainer.createFor({ element: contentElement, condition: !!description })}
        {!hasChildren &&
          HeaderDescription.create(description, {
            defaultProps: {
              variables: {
                ...(v.descriptionColor && { color: v.descriptionColor }),
              },
            },
          })}
      </ElementType>
    )
  }
}

export default Header
