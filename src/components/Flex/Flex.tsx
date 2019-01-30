import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, commonPropTypes } from '../../lib'
import { ReactProps } from '../../../types/utils'
import FlexItem from './FlexItem'

export interface FlexProps {
  /** Defines if container should be inline element. */
  inline?: boolean

  /** Sets horizontal flow for the container. */
  row?: boolean

  /** Sets vertical flow for the container. */
  column?: boolean

  /** Allows overflow items to wrap on the next container's line. */
  wrap?: boolean

  /** Controls items alignment in horizontal direction. */
  hAlign?: 'start' | 'center' | 'end' | 'stretch'

  /** Controls items alignment in vertical direction. */
  vAlign?: 'start' | 'center' | 'end' | 'stretch' //  'top' | 'center' | 'bottom' as an alternative

  /** Defines strategy for distributing remaining space between items. */
  space?: 'around' | 'between' | 'evenly'

  // for now - but it should be a string with limited set of values
  /** Defines gap between each two adjacent child items. */
  gap?: number | string

  ////////// EXPERIMENTAL ONES /////////////
  /** Defines container's padding. */
  padding?: number | string // but it should be a 'string' with limited set of values

  /** Enables debug mode. */
  debug?: boolean

  /** Orders container to fill all parent's space available. */
  fill?: boolean
}

/**
 * Arrange group of items aligned towards common direction.
 */
class Flex extends UIComponent<ReactProps<FlexProps>, any> {
  static Item: any

  static Row: any
  static Column: any

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

    row: PropTypes.bool,
    column: PropTypes.bool,

    wrap: PropTypes.bool,

    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    vAlign: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),

    space: PropTypes.oneOf(['around', 'between', 'evenly']),

    gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // for now - but it should be a string with limited set of values

    ////////// EXPERIMENTAL ONES /////////////
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // but it should be a 'string' with limited set of values
    debug: PropTypes.bool,
    fill: PropTypes.bool,
    ////////////////////////////////////////////
  }

  renderChildren = () => {
    const { column, gap, children } = this.props

    let isFirst = true
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      const childElement =
        (child.type as any) && (child.type as any).__isFlexItem
          ? React.cloneElement(child, {
              flexDirection: column ? 'column' : 'row',
            })
          : child

      return (
        <>
          {!isFirst && gap ? <Flex.Gap gap={gap} column={column} /> : void (isFirst = false)}
          {childElement}
        </>
      )
    })
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {this.renderChildren()}
      </ElementType>
    )
  }
}

class FlexRow extends Flex {}
class FlexColumn extends Flex {}

FlexRow.defaultProps = {
  ...Flex.defaultProps,
  row: true,
} as any

FlexColumn.defaultProps = {
  ...Flex.defaultProps,
  column: true,
} as any

Flex.Item = FlexItem

Flex.Row = FlexRow
Flex.Column = FlexColumn

Flex.Gap = ({ gap, column }) => <div style={column ? { height: gap } : { width: gap }} />

export default Flex
