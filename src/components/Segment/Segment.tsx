import * as React from 'react'
import * as PropTypes from 'prop-types'
import { UIComponent, childrenExist } from '../../lib'
import { Extendable } from '../../../types/utils'
import { UIComponentProps, SimpleContentComponentProps } from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  simpleContentComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface SegmentProps
  extends UIComponentProps<SegmentProps, any>,
    SimpleContentComponentProps {
  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean
}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<Extendable<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...simpleContentComponentPropsTypes,
    inverted: PropTypes.bool,
    renderContent: PropTypes.func,
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
