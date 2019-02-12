import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import cx from 'classnames'

import { UIComponent, commonPropTypes } from '../../lib'
import { ReactProps } from '../../types'
import FlexItem from './FlexItem'
import FlexGap from './FlexGap'

export interface FlexProps {
  /** Defines if container should be inline element. */
  inline?: boolean

  /** Sets vertical flow direction. */
  column?: boolean

  /** Allows overflow items to wrap on the next container's line. */
  wrap?: boolean

  /** Controls items alignment in horizontal direction. */
  hAlign?: 'start' | 'center' | 'end' | 'stretch'

  /** Controls items alignment in vertical direction. */
  vAlign?: 'start' | 'center' | 'end' | 'stretch'

  /** Defines strategy for distributing remaining space between items. */
  space?: 'around' | 'between' | 'evenly'

  /** Defines gap between each two adjacent child items. */
  gap?: 'gap.small' | 'gap.medium' | 'gap.large'

  /** Defines container's padding. */
  padding?: 'padding.medium'

  /** Enables debug mode. */
  debug?: boolean

  /** Orders container to fill all parent's space available. */
  fill?: boolean
}

/**
 * Arrange group of items aligned towards common direction.
 */
class Flex extends UIComponent<ReactProps<FlexProps>> {
  static Item = FlexItem

  static Gap = FlexGap

  static displayName = 'Flex'
  static className = 'ui-flex'

  static defaultProps = {
    as: 'div',
  }

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),

    inline: PropTypes.bool,

    column: PropTypes.bool,

    wrap: PropTypes.bool,

    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    vAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),

    space: PropTypes.oneOf(['around', 'between', 'evenly']),

    gap: PropTypes.oneOf(['gap.small', 'gap.medium', 'gap.large']),

    padding: PropTypes.oneOf(['padding.medium']),
    fill: PropTypes.bool,

    debug: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {this.renderChildren(classes.gap)}
      </ElementType>
    )
  }

  renderChildren = (gapClasses: string) => {
    const { column, gap, children } = this.props

    let isFirstElement = true
    return React.Children.map(children, (child: any) => {
      const maybeChildElement =
        child && child.type && ((child.type as any) as typeof FlexItem).__isFlexItem
          ? React.cloneElement(child, {
              flexDirection: column ? 'column' : 'row',
            })
          : child

      const renderGap = !isFirstElement
      if (maybeChildElement) {
        isFirstElement = false
      }

      return (
        maybeChildElement && (
          <>
            {renderGap && gap && <Flex.Gap className={cx(`${Flex.className}__gap`, gapClasses)} />}
            {maybeChildElement}
          </>
        )
      )
    })
  }
}

export default Flex
