import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentNodeComponentProps,
  commonPropTypes,
} from '../../lib'
import { Extendable, ComponentEventHandler } from '../../../types/utils'

export interface AccordionContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentNodeComponentProps {
  /** Whether or not the content is visible. */
  active?: boolean

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<AccordionContentProps>
}

/**
 * A standard AccordionContent.
 */
class AccordionContent extends UIComponent<Extendable<AccordionContentProps>, any> {
  static displayName = 'AccordionContent'

  static create: Function

  static className = 'ui-accordion__content'

  static propTypes = {
    ...commonPropTypes.commonUIComponentPropTypes,
    ...commonPropTypes.childrenComponentPropTypes,
    ...commonPropTypes.contentNodeComponentPropsTypes,
    active: PropTypes.bool,
    onClick: PropTypes.func,
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

AccordionContent.create = createShorthandFactory(AccordionContent, 'content')

export default AccordionContent
