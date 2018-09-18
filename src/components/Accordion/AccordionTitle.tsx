import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes } from '../../lib'
import { Extendable, ReactChildren, ComponentEventHandler } from '../../../types/utils'
import {
  IAtomicItemProps,
  BaseAtomicItem,
} from '../../lib/accessibility/FocusHandling/BaseAtomicItem'
import DefaultTabableBehavior from '../../lib/accessibility/Behaviors/DefaultTabableBehavior'
import { Accessibility } from '../../lib/accessibility/interfaces'

export interface IAccordionTitleProps extends IAtomicItemProps {
  accessibility?: Accessibility
  as?: any
  active?: boolean
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  index?: string | number
  onClick?: ComponentEventHandler<IAccordionTitleProps>
}

/**
 * A standard AccordionTitle.
 */
class AccordionTitle extends BaseAtomicItem<Extendable<IAccordionTitleProps>> {
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
  ]

  public static defaultProps = {
    accessibility: DefaultTabableBehavior as Accessibility,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest }) {
    const { active, children, content } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes.root} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root} onClick={this.handleClick}>
        {active ? <span>&#9660;</span> : <span>&#9654;</span>}
        {content}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory(AccordionTitle, content => ({ content }))

export default AccordionTitle
