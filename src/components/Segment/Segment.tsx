import * as React from 'react'
import * as PropTypes from 'prop-types'
import { UIComponent, childrenExist } from '../../lib'
import { Extendable, ShorthandRenderFunction } from '../../../types/utils'
import { UIComponentProps, ContentComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, contentComponentPropsTypes } from '../../lib/commonPropTypes'
import Slot from '../Slot/Slot'

export interface SegmentProps extends UIComponentProps<SegmentProps, any>, ContentComponentProps {
  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean

  /**
   * A custom render function the content slot.
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderContent?: ShorthandRenderFunction
}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<Extendable<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...contentComponentPropsTypes,
    inverted: PropTypes.bool,
    renderContent: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, renderContent } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : Slot.create(content, { render: renderContent })}
      </ElementType>
    )
  }
}

export default Segment
