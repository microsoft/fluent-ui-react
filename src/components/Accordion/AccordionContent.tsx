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

export interface IAccordionContentProps extends IAtomicItemProps {
  accessibility?: Accessibility
  as?: any
  active?: boolean
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  onClick?: ComponentEventHandler<IAccordionContentProps>
}

/**
 * A standard AccordionContent.
 */
class AccordionContent extends BaseAtomicItem<Extendable<IAccordionContentProps>> {
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
    'onClick',
  ]

  public static defaultProps = {
    accessibility: DefaultTabableBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

AccordionContent.create = createShorthandFactory(AccordionContent, content => ({ content }))

export default AccordionContent
