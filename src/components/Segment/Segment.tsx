import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import Box from '../Box/Box'
import { segmentRtlAttributes, RtlFunc } from '@stardust-ui/react'

export interface SegmentProps
  extends UIComponentProps<SegmentProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean

  /**
   * Rtl attributes function if overridden by the user.
   * @default segmentRtlAttributes
   */
  rtlAttributes?: RtlFunc
}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<ReactProps<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    inverted: PropTypes.bool,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    rtlAttributes: segmentRtlAttributes,
  }

  renderComponent({ ElementType, classes, unhandledProps, rtlAttributes }) {
    const { children, content } = this.props

    return (
      <ElementType {...rtlAttributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : Box.create(content)}
      </ElementType>
    )
  }
}

export default Segment
