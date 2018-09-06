import * as React from 'react'
import * as PropTypes from 'prop-types'
import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface ISegmentProps {
  as?: any
  className?: string
  content?: any
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class Segment extends UIComponent<Extendable<ISegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['as', 'className', 'content', 'styles', 'variables']

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
