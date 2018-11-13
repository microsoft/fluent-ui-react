import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import { Extendable, ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import { createSlot } from '../Slot/Slot'

export interface SegmentProps {
  as?: any
  className?: string
  color?: string
  content?: ShorthandValue
  inverted?: boolean
  renderContent?: ShorthandRenderFunction
  styles?: ComponentSlotStyle<SegmentProps, any>
  variables?: ComponentVariablesInput
}

/**
 * A segment is used to create a grouping of related content.
 */
class Segment extends UIComponent<Extendable<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** A segment can have different colors */
    color: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.itemShorthand,

    /** A segment can have its colors inverted for contrast. */
    inverted: PropTypes.bool,

    /**
     * A custom render function the content slot.
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderContent: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, renderContent } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : createSlot(content, { render: renderContent })}
      </ElementType>
    )
  }
}

export default Segment
