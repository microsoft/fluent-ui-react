import * as PropTypes from 'prop-types'
import * as React from 'react'
import _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ChatPaneContentBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

/**
 * A standard AccordionContent.
 */
class AccordionContent extends UIComponent<any, any> {
  static displayName = 'AccordionContent'

  static create: Function

  static className = 'ui-accordion__content'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Whether or not the content is visible. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    contentReturnHandler: PropTypes.object,

    /** AccordionTitle index inside Accordion. */
    titleIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'active',
    'children',
    'className',
    'content',
    'contentReturnHandler',
    'titleIndex',
  ]

  static defaultProps = {
    accessibility: ChatPaneContentBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { children, content } = this.props
    this.registerActionHandler(this.props.contentReturnHandler)

    return (
      <ElementType
        {...rest}
        className={classes.root}
        onKeyDown={this.keyHandler()}
        {...accessibility.attributes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

AccordionContent.create = createShorthandFactory(AccordionContent, content => ({ content }))

export default AccordionContent
