import * as React from 'react'
import { UIComponent, childrenExist } from '../../lib'
import { Extendable } from '../../../types/utils'
import { UIComponentProps, ContentComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, contentComponentPropsTypes } from '../../lib/commonPropTypes'

export interface SegmentProps extends UIComponentProps<SegmentProps, any>, ContentComponentProps {}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<Extendable<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...contentComponentPropsTypes,
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Segment
