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
} from '../../lib'
import { ReactProps, ComponentEventHandler, ShorthandValue } from '../../../types/utils'
import Icon from '../Icon/Icon'

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

  /** Indicates whether the active indicator should be shown, or defines an icon for it. */
  activeIndicator?: boolean | ShorthandValue
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
    activeIndicator: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  }

  static defaultProps = {
    activeIndicator: true,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const { children, content, activeIndicator, active } = this.props
    const showActiveIndicatorIcon = typeof activeIndicator !== 'boolean'
    const activeIndicatorIcon = Icon.create(activeIndicator, {
      defaultProps: {
        rotate: active ? 0 : -90,
      },
    })
    const contentElement = (
      <>
        {showActiveIndicatorIcon && activeIndicatorIcon}
        {content}
      </>
    )

    return (
      <ElementType {...unhandledProps} className={classes.root} onClick={this.handleClick}>
        {childrenExist(children) ? children : contentElement}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory(AccordionTitle, 'content')

export default AccordionTitle
