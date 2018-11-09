import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import { Extendable } from '../../../types/utils'
import { UIComponentProps } from '../../lib/UIComponent'

export interface SegmentProps extends UIComponentProps<SegmentProps, any> {
  /** Shorthand for primary content. */
  content?: any
}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<Extendable<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    content: PropTypes.any,
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
