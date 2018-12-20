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
import Slot from '../Slot/Slot'

export interface SegmentProps
  extends UIComponentProps<SegmentProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean
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
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : Slot.create(content)}
      </ElementType>
    )
  }
}

export default Segment
