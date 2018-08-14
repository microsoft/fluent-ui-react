import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ChatPaneTitleBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import ChatPaneTitleExpandAction from '../../lib/actions/ChatPaneTitleExpandAction'
import keyboardKey from 'keyboard-key'

/**
 * A standard AccordionTitle.
 */
class AccordionTitle extends UIComponent<any, any> {
  static displayName = 'AccordionTitle'

  static create: Function

  static className = 'ui-accordion__title'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Whether or not the title is in the open state. */
    active: PropTypes.bool,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** AccordionTitle index inside Accordion. */
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    titleExpandHandler: PropTypes.object,
    addAccordionTitle: PropTypes.func,
  }

  static handledProps = [
    'accessibility',
    'as',
    'active',
    'children',
    'className',
    'content',
    'index',
    'onClick',
    'titleExpandHandler',
    'addAccordionTitle',
  ]

  static defaultProps = {
    accessibility: ChatPaneTitleBehavior as Accessibility,
  }

  constructor(props, ctx) {
    super(props, ctx)
    this.registerActionHandler(props.titleExpandHandler)

    this.handleKey(keyboardKey.ArrowRight, (key, event) => {
      this.executeAction(
        ChatPaneTitleExpandAction.execute({ index: props['index'], expand: true, event }),
      )
    })

    this.handleKey(keyboardKey.ArrowLeft, (key, event) => {
      this.executeAction(
        ChatPaneTitleExpandAction.execute({ index: props['index'], expand: false, event }),
      )
    })
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }
  addAccordionTitle = ref => {
    _.invoke(this.props, 'addAccordionTitle', ref)
  }

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { active, children, content } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType
        {...rest}
        className={classes.root}
        onClick={this.handleClick}
        onKeyDown={this.keyHandler()}
        {...accessibility.attributes.root}
        ref={this.addAccordionTitle}
      >
        {active ? <span>&#9660;</span> : <span>&#9654;</span>}
        {content}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory(AccordionTitle, content => ({ content }))

export default AccordionTitle
