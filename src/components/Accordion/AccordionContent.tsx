import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, UIComponent } from '../../lib'
import { Extendable, ComponentEventHandler } from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  SimpleContentComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  simpleContentComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface AccordionContentProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    SimpleContentComponentProps {
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
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...simpleContentComponentPropsTypes,
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
