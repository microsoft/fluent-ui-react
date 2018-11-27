import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentNodeComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import { Extendable, ComponentEventHandler } from '../../../types/utils'

export interface AccordionTitleProps
  extends UIComponentProps<any, any>,
    ContentNodeComponentProps,
    ChildrenComponentProps {
  /** Whether or not the title is in the open state. */
  active?: boolean

  /** AccordionTitle index inside Accordion. */
  index?: string | number

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<AccordionTitleProps>
}

/**
 * A standard AccordionTitle.
 */
class AccordionTitle extends UIComponent<Extendable<AccordionTitleProps>, any> {
  static displayName = 'AccordionTitle'

  static create: Function

  static className = 'ui-accordion__title'

  static propTypes = {
    ...commonPropTypes.commonUIComponentPropTypes,
    ...commonPropTypes.childrenComponentPropTypes,
    ...commonPropTypes.contentNodeComponentPropsTypes,
    active: PropTypes.bool,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
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

AccordionTitle.create = createShorthandFactory(AccordionTitle, 'content')

export default AccordionTitle
