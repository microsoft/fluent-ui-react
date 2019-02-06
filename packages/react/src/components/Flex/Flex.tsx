import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, commonPropTypes } from '../../lib'
import { ReactProps } from '../../types'
import FlexItem from './FlexItem'

export type FlexGap = 'gap.small' | 'gap.medium' | 'gap.large'
export type FlexPadding = 'padding.medium'

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

  // for now - but it should be a string with limited set of values
  /** Defines gap between each two adjacent child items. */
  gap?: FlexGap

  ////////// EXPERIMENTAL ONES /////////////
  /** Defines container's padding. */
  padding?: FlexPadding

  /** Enables debug mode. */
  debug?: boolean

  /** Orders container to fill all parent's space available. */
  fill?: boolean
}

/**
 * Arrange group of items aligned towards common direction.
 */
class Flex extends UIComponent<ReactProps<FlexProps>, any> {
  static Item: typeof FlexItem

  static Gap: any

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

    gap: PropTypes.string,

    ////////// EXPERIMENTAL ONES /////////////
    padding: PropTypes.string,
    debug: PropTypes.bool,
    fill: PropTypes.bool,
    ////////////////////////////////////////////
  }

  renderChildren = gapClasses => {
    const { column, gap, children } = this.props

    let isFirst = true
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      const childElement =
        child.type && ((child.type as any) as typeof FlexItem).__isFlexItem
          ? React.cloneElement(child, {
              flexDirection: column ? 'column' : 'row',
            })
          : child

      const renderGap = !isFirst
      isFirst = false

      return (
        <>
          {renderGap && gap && <Flex.Gap className={gapClasses} />}
          {childElement}
        </>
      )
    })
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {this.renderChildren(classes.gap)}
      </ElementType>
    )
  }
}

Flex.Item = FlexItem
Flex.Gap = ({ className }) => <div className={className} />

export default Flex
