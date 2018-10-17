import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'

export interface ISegmentProps {
  as?: any
  className?: string
  content?: any
  styles?: ComponentPartStyle<ISegmentProps, any>
  variables?: ComponentVariablesInput
}

class Segment extends UIComponent<Extendable<ISegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
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
