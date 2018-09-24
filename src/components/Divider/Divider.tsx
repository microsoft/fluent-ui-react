import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface IDividerProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  size?: number
  type?: 'primary' | 'secondary'
  important?: boolean
  styles?: ComponentPartStyle
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

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional css class name or space separated class names to apply **/
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Size multiplier (default 0) * */
    size: PropTypes.number,

    /** A Divider can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A divider can appear more important and draw the user's attention. */
    important: PropTypes.bool,

    /** Styles to apply to this component instance **/
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
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

export type IDividerPropsWithDefaults = IDividerProps & typeof Divider.defaultProps
