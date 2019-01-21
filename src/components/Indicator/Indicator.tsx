import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  customPropTypes,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import Icon from '../Icon/Icon'

export interface IndicatorProps extends UIComponentProps {
  /** The indicator can point towards different directions. */
  direction?: 'start' | 'end' | 'top' | 'bottom'

  /** The indicator can show specific icon if provided. */
  icon?: ShorthandValue
}

/**
 * An indicator is suggesting additional content next to the element it is used in.
 */
class Indicator extends UIComponent<ReactProps<IndicatorProps>, any> {
  static displayName = 'Indicator'

  static create: Function

  static className = 'ui-indicator'

  static directionMap = {
    end: { unicode: '\u25B8', rotation: -90 },
    start: { unicode: '\u25C2', rotation: 90 },
    top: { unicode: '\u25B4', rotation: 180 },
    bottom: { unicode: '\u25BE', rotation: 0 },
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ children: false, content: false }),
    direction: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
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

    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {icon
          ? Icon.create(icon, {
              defaultProps: { color },
              overrideProps: ({ rotate }) => ({
                rotate: (Indicator.directionMap[direction].rotation || 0) + (rotate || 0),
              }),
            })
          : hexUnicode}
      </ElementType>
    )
  }

  private getDirectionBasedOnRtl = (rtl: boolean, direction) => {
    if (!rtl) return direction
    if (direction === 'start') return 'end'
    if (direction === 'end') return 'start'
    return direction
  }
}

Indicator.create = createShorthandFactory(Indicator, 'hex')

export default Indicator
