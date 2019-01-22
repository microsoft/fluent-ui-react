import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  customPropTypes,
  rtlTextContainer,
} from '../../lib'
import { ReactProps, ComponentEventHandler, ShorthandValue } from '../../../types/utils'
import Indicator from '../Indicator/Indicator'

export interface AccordionTitleProps
  extends UIComponentProps,
    ContentComponentProps,
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

  /** Shorthand for the active indicator. */
  indicator?: ShorthandValue
}

/**
 * A standard AccordionTitle.
 */
class AccordionTitle extends UIComponent<ReactProps<AccordionTitleProps>, any> {
  static displayName = 'AccordionTitle'

  static create: Function

  static className = 'ui-accordion__title'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    indicator: customPropTypes.itemShorthand,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps, styles }) {
    const { children, content, indicator, active } = this.props
    const indicatorWithDefaults = indicator === undefined ? {} : indicator

    const contentElement = (
      <>
        {Indicator.create(indicatorWithDefaults, {
          defaultProps: {
            direction: active ? 'bottom' : 'end',
            styles: styles.indicator,
          },
        })}
        {rtlTextContainer.createFor({ element: content })}
      </>
    )

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? children : contentElement}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory(AccordionTitle, 'content')

export default AccordionTitle
