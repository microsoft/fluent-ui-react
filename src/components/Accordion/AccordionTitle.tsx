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
import UnicodeCharacter from '../UnicodeCharacter/UnicodeCharacter'
import uc from '../UnicodeCharacter/unicodeCharacters'

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
  activeIndicator?: ShorthandValue
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
    activeIndicator: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    activeIndicator: true,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps, styles }) {
    const { children, content, activeIndicator, active } = this.props
    const showActiveIndicatorIcon = typeof activeIndicator !== 'boolean'
    const showActiveIndicatorUnicode = activeIndicator === true

    const contentElement = (
      <>
        {showActiveIndicatorIcon &&
          Icon.create(activeIndicator, {
            defaultProps: {
              rotate: active ? 0 : -90,
            },
          })}
        {showActiveIndicatorUnicode &&
          UnicodeCharacter.create(
            active ? uc.blackDownPointingSmallTriangle : uc.blackRightPointingSmallTriangle,
            {
              defaultProps: { styles: styles.activeIndicator },
            },
          )}
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
