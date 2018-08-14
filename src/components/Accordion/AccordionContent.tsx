import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import accordionContentRules from './accordionContentRules'
import accordionContentVariables from './accordionContentVariables'
import { ChatPaneContentBehavior } from '../../lib/accessibility/Behaviors/Accordion/ChatPaneContentBehavior'

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
  }

  static handledProps = [
    'as',
    'active',
    'children',
    'className',
    'content',
    'contentReturnHandler',
    'titleIndex',
  ]

  static rules = accordionContentRules

  static variables = accordionContentVariables

  constructor(p, context) {
    super(p, context)

    this.registerActionHandler(this.props.contentReturnHandler)
    this.accBehavior = new ChatPaneContentBehavior()
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...rest}
        className={classes.root}
        onKeyDown={this.accBehavior.onKeyDown(this, this.props, this.state)}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

AccordionContent.create = createShorthandFactory(AccordionContent, content => ({ content }))

export default AccordionContent
