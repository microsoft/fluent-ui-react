import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
  Extendable,
} from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface IDividerProps {
  as?: any
  className?: string
  content?: React.ReactNode
  size?: number
  type?: 'primary' | 'secondary'
  important?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * @accessibility
 * This is shown at the top.
 */
class Divider extends UIComponent<Extendable<IDividerProps>, any> {
  static displayName = 'Divider'

  static create: Function

  static className = 'ui-divider'

  static propTypes = {
    as: customPropTypes.as,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Size multiplier (default 0) * */
    size: PropTypes.number,

    /** A Divider can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A divider can appear more important and draw the user's attention. */
    important: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'important',
    'size',
    'styles',
    'type',
    'variables',
  ]

  static defaultProps = {
    size: 0,
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

Divider.create = createShorthandFactory(Divider, content => ({ content }))

export default Divider
