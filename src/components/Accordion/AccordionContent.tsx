import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { Children, Extendable } from '../../../types/utils'

export interface IAccordionContentProps {
  as?: any
  active?: boolean
  children?: Children
  className?: string
  content?: React.ReactNode
  onClick?: (event: React.SyntheticEvent, data: IAccordionContentProps) => void
}

/**
 * A standard AccordionContent.
 */
class AccordionContent extends UIComponent<Extendable<IAccordionContentProps>, any> {
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
  }

  static handledProps = ['as', 'active', 'children', 'className', 'content', 'onClick']

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
