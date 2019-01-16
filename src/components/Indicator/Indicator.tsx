import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  customPropTypes,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import Icon from '../Icon/Icon'

export interface IndicatorProps extends UIComponentProps, ColorComponentProps {
  /** The indicator can be direction in different directions. */
  direction?: 'forward' | 'back' | 'top' | 'bottom'

  /** The indicator can show specific icon if provided. */
  icon?: ShorthandValue
}

/**
 * An indicator is suggest additional content next to the element it is inside.
 */
class Indicator extends UIComponent<ReactProps<IndicatorProps>, any> {
  static displayName = 'Indicator'

  static create: Function

  static className = 'ui-indicator'

  static directionMap = {
    forward: { unicode: '25B8', rotation: -90 },
    back: { unicode: '25C2', rotation: 90 },
    top: { unicode: '25B4', rotation: 180 },
    bottom: { unicode: '25BE', rotation: 0 },
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ children: false, content: false }),
    direction: PropTypes.oneOf(['forward', 'back', 'top', 'bottom']),
    icon: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'span',
    direction: 'bottom',
  }

  renderComponent({ ElementType, classes, unhandledProps, rtl }) {
    const { direction, icon, color } = this.props
    const hexUnicode =
      direction && Indicator.directionMap[this.getDirectionBasedOnRtl(rtl, direction)].unicode
    const contentProps = !icon
      ? {
          dangerouslySetInnerHTML: {
            __html: hexUnicode && this.isHex(hexUnicode) ? `&#x${hexUnicode};` : '',
          },
        }
      : {
          children: Icon.create(icon, {
            defaultProps: { color, rotate: Indicator.directionMap[direction].rotation },
          }),
        }
    return <ElementType {...unhandledProps} className={classes.root} {...contentProps} />
  }

  private isHex(h) {
    return (
      parseInt(h, 16)
        .toString(16)
        .toUpperCase() === h.toUpperCase()
    )
  }

  private getDirectionBasedOnRtl = (rtl: boolean, direction) => {
    if (!rtl) return direction
    if (direction === 'forward') return 'back'
    if (direction === 'back') return 'forward'
    return direction
  }
}

Indicator.create = createShorthandFactory(Indicator, 'hex')

export default Indicator
